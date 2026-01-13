
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const QUESTION_BANK_PATH = path.join(__dirname, '../doc/complete_question_bank_localized.csv');
const VIDEO_LESSONS_PATH = path.join(__dirname, '../doc/grammar/epic_lessons_full_report.csv');
const TOPIC_MAPPING_PATH = path.join(__dirname, '../doc/grammar/topic_mapping.md');
const OUTPUT_PATH = path.join(__dirname, '../doc/grammar/question_to_video_mapping.csv');

// --- Helper: CSV Parser ---
// Handles quoted fields with commas inside
function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length === 0) return [];

    // Parse header
    const headers = parseLine(lines[0]);

    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const values = parseLine(line);

        // Skip malformed lines (simple check)
        if (values.length !== headers.length) {
            // Try to handle multiline CSVs if necessary, but consistent simple parsing for now
            // For strict correctness, we'd need a robust state machine parser, but let's see if this suffices.
            // If values < headers, it might be a multiline split. 
            // Given the file sizes, a simple regex split usually handles the "quoted comma" case but not newlines in quotes.
            // Let's rely on the regex below which handles quoted commas.
        }

        const row = {};
        headers.forEach((h, index) => {
            row[h] = values[index] || '';
        });
        data.push(row);
    }
    return data;
}

function parseLine(line) {
    const values = [];
    let current = '';
    let inQuote = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            // Check for escaped quote (double quote)
            if (inQuote && line[i + 1] === '"') {
                current += '"';
                i++; // Skip next quote
            } else {
                inQuote = !inQuote;
            }
        } else if (char === ',' && !inQuote) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current);
    return values;
}

// --- Helper: Parse Topic Mapping ---
function parseTopicMapping(markdownText) {
    const mapping = {};
    const lines = markdownText.split(/\r?\n/);

    // Locate the table
    let inTable = false;

    for (const line of lines) {
        if (line.includes('| ID | Broad Grammar Topic |')) {
            inTable = true;
            continue;
        }
        if (!inTable) continue;
        if (!line.trim().startsWith('|')) {
            // End of table
            if (inTable && line.trim() === '') inTable = false;
            continue;
        }
        if (line.includes('---')) continue;

        // Parse row: | 1 | Present tenses | gra_23: Present Simple, ... |
        const parts = line.split('|').map(p => p.trim()).filter(p => p !== '');
        if (parts.length < 3) continue;

        const broadTopic = parts[1];
        const ejoyMappingRaw = parts[2];

        // Extract eJOY IDs: "gra_23: Present Simple, gra_28: ..." -> ["gra_23", "gra_28"]
        const ids = [];
        const matches = ejoyMappingRaw.matchAll(/(gra_\d+|gra_\d+_p\d+)/g);
        for (const match of matches) {
            ids.push(match[0]);
        }

        // Normalize key (remove extra spaces similar to CSV)
        mapping[broadTopic.toLowerCase()] = ids;
    }
    return mapping;
}

// --- Logic: Infer Level ---
function inferLevel(unitIndexRaw) {
    // "Unit 1" -> 1
    const match = unitIndexRaw.match(/Unit\s*(\d+)/i);
    if (!match) return 3; // Default to intermediate if unknown

    const unit = parseInt(match[1], 10);

    if (unit <= 3) return 1;
    if (unit <= 7) return 2;
    if (unit <= 11) return 3;
    if (unit <= 15) return 4;
    if (unit <= 19) return 5;
    if (unit <= 22) return 6;
    return 7;
}

// --- Main Execution ---
try {
    console.log('Reading files...');
    const questionText = fs.readFileSync(QUESTION_BANK_PATH, 'utf8');
    const videoText = fs.readFileSync(VIDEO_LESSONS_PATH, 'utf8');
    const mappingText = fs.readFileSync(TOPIC_MAPPING_PATH, 'utf8');

    console.log('Parsing data...');
    const questions = parseCSV(questionText);
    const videos = parseCSV(videoText);
    const topicMap = parseTopicMapping(mappingText);

    // Group videos by Topic ID + Level for fast lookup
    // Structure: map[topicId][level] = [video1, video2, ...]
    const videoIndex = {};

    videos.forEach(v => {
        const topicId = v['Grammar Topic ID'] || '';
        const level = parseInt(v['English Level'] || '0', 10);

        if (!topicId) return;

        if (!videoIndex[topicId]) videoIndex[topicId] = {};
        if (!videoIndex[topicId][level]) videoIndex[topicId][level] = [];

        videoIndex[topicId][level].push(v);
    });

    console.log('Mapping questions to videos...');
    const results = [];

    // Stats
    let foundExact = 0;
    let foundFallback = 0;
    let foundAny = 0;
    let notFound = 0;
    let questionsProcessed = 0;

    questions.forEach(q => {
        const qId = q['Q#'];
        const qText = q['Question Text'];
        const qUnit = q['Unit Index'];
        const qTopic = q['Grammar Topic'];

        if (!qId) return; // Skip empty rows
        questionsProcessed++;

        const inferredLevel = inferLevel(qUnit);

        // Get eJOY Topic IDs
        const ejoyIds = topicMap[qTopic.toLowerCase()] || [];

        let bestVideo = null;
        let matchType = 'None';

        // Search Strategy:
        // 1. Exact Level Match for any mapped topic
        // 2. Fallback: Level - 1
        // 3. Fallback: Level + 1

        const levelsToTry = [inferredLevel, inferredLevel - 1, inferredLevel + 1];

        outerLoop:
        for (const currentLevel of levelsToTry) {
            if (currentLevel < 1 || currentLevel > 7) continue;

            for (const topicId of ejoyIds) {
                if (videoIndex[topicId] && videoIndex[topicId][currentLevel] && videoIndex[topicId][currentLevel].length > 0) {
                    // Found a match!
                    // Pick a random one or the first one? Let's pick the one with highest duration (likely more substantial) or just random.
                    // Let's pick random to distribute if there are many questions.
                    const candidates = videoIndex[topicId][currentLevel];
                    bestVideo = candidates[Math.floor(Math.random() * candidates.length)];

                    if (currentLevel === inferredLevel) {
                        matchType = 'Exact Level';
                        foundExact++;
                    } else {
                        matchType = `Fallback Level ${currentLevel}`;
                        foundFallback++;
                    }
                    break outerLoop;
                }
            }
        }

        // 4. Final Fallback: Any level for this topic
        if (!bestVideo) {
            // Collect all videos for all mapped topics
            let allCandidates = [];
            for (const topicId of ejoyIds) {
                if (videoIndex[topicId]) {
                    for (const lvl in videoIndex[topicId]) {
                        videoIndex[topicId][lvl].forEach(v => allCandidates.push({ ...v, lvl: parseInt(lvl, 10) }));
                    }
                }
            }

            if (allCandidates.length > 0) {
                // Find candidate with level closest to inferredLevel
                // Sort by distance to inferredLevel, then by Level desc (prefer higher if equal distance? or lower? Let's say higher to be challenging)
                allCandidates.sort((a, b) => {
                    const distA = Math.abs(a.lvl - inferredLevel);
                    const distB = Math.abs(b.lvl - inferredLevel);
                    if (distA !== distB) return distA - distB;
                    return b.lvl - a.lvl; // Tie-breaker: prefer higher level
                });

                bestVideo = allCandidates[0];
                matchType = `Any Level (Found ${bestVideo.lvl})`;
                foundAny++;
            }
        }

        if (!bestVideo) {
            notFound++;
        }

        results.push({
            'Q#': qId,
            'Question Text': qText,
            'Grammar Topic': qTopic,
            'Unit Index': qUnit,
            'Inferred Level': inferredLevel,
            'Video Match Type': matchType,
            'Video ID': bestVideo ? bestVideo['Lesson ID'] : '',
            'Video Name': bestVideo ? bestVideo['Lesson Name'] : '',
            'Video URL': bestVideo ? bestVideo['URL'] : ''
        });
    });

    console.log('Writing output...');
    // Generate CSV Output
    const headers = ['Q#', 'Question Text', 'Grammar Topic', 'Unit Index', 'Inferred Level', 'Video Match Type', 'Video ID', 'Video Name', 'Video URL'];

    const csvContent = [
        headers.join(','),
        ...results.map(row =>
            headers.map(header => {
                let val = row[header];
                if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
                    val = `"${val.replace(/"/g, '""')}"`;
                }
                return val;
            }).join(',')
        )
    ].join('\n');

    fs.writeFileSync(OUTPUT_PATH, csvContent);

    console.log('------------------------------------------------');
    console.log(`Processing Complete.`);
    console.log(`Total Questions: ${questionsProcessed}`);
    console.log(`Exact Level Matches: ${foundExact}`);
    console.log(`Fallback Level Matches: ${foundFallback}`);
    console.log(`Any Level Matches: ${foundAny}`);
    console.log(`No Video Found: ${notFound}`);
    console.log(`Output saved to: ${OUTPUT_PATH}`);
    console.log('------------------------------------------------');

} catch (error) {
    console.error('Error occurred:', error);
}
