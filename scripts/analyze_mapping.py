import csv
import re

def analyze():
    q_bank_path = 'doc/complete_question_bank_localized.csv'
    topics_path = 'doc/grammar/Grammar_Topics_by_Unit_and_Page.csv'

    # Read Topics
    topics = {}
    with open(topics_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Assuming Unit Index is unique in topics file
            idx = row['Unit Index'].strip()
            topics[idx] = row

    print(f"Loaded {len(topics)} topics.")
    
    # Read Questions
    mapped_count = 0
    total_count = 0
    mismatches = []
    
    with open(q_bank_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            total_count += 1
            unit_str = row['Unit Index'].strip()
            # Extract number from "Unit 1"
            match = re.search(r'\d+', unit_str)
            if match:
                unit_id = match.group(0)
                
                if unit_id in topics:
                    mapped_count += 1
                    # Check if topic name matches (optional, but good to know)
                    q_topic = row['Grammar Topic'].strip()
                    t_topic = topics[unit_id]['Grammar Topic'].strip()
                    if q_topic.lower() != t_topic.lower():
                        # mismatches.append(f"Row {i+2}: Unit {unit_id} has topic '{q_topic}' in Q-Bank but '{t_topic}' in Topics file.")
                        pass # It seems Unit Index is the robust key
                else:
                    mismatches.append(f"Row {i+2}: Unit ID '{unit_id}' not found in topics.")
            else:
                mismatches.append(f"Row {i+2}: Could not parse unit ID from '{unit_str}'.")

    print(f"Total Questions: {total_count}")
    print(f"Successfully Mapped: {mapped_count}")
    
    if mismatches:
        print("Mismatches found (first 10):")
        for m in mismatches[:10]:
            print(m)
    else:
        print("All questions mapped successfully via Unit Index.")

if __name__ == "__main__":
    analyze()
