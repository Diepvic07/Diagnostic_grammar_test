import csv
import re

def map_questions():
    q_bank_path = 'doc/complete_question_bank_localized.csv'
    topics_path = 'doc/grammar/Grammar_Topics_by_Unit_and_Page.csv'
    output_path = 'doc/complete_question_bank_with_units.csv'

    # Read Topics
    topics = {}
    with open(topics_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            idx = row['Unit Index'].strip()
            topics[idx] = row

    # Process Questions
    fieldnames = []
    rows = []
    
    with open(q_bank_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames + ['Unit Details']
        
        for row in reader:
            unit_str = row['Unit Index'].strip()
            match = re.search(r'\d+', unit_str)
            if match:
                unit_id = match.group(0)
                if unit_id in topics:
                    t = topics[unit_id]
                    # Format: Unit [N]: [Topic Name] - Page [Page Number]
                    # The user prompt: "a unit with grammar topic name and its page will be added to the question table as text"
                    # Example assumption: "Unit 1: Present tenses - Page 1"
                    detail_str = f"Unit {unit_id}: {t['Grammar Topic']} - Page {t['Page']}"
                    row['Unit Details'] = detail_str
                else:
                    row['Unit Details'] = "Unit Info Not Found"
            else:
                row['Unit Details'] = "Invalid Unit Index"
            rows.append(row)

    # Write Output
    with open(output_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
        
    print(f"Successfully created {output_path} with {len(rows)} rows.")

if __name__ == "__main__":
    map_questions()
