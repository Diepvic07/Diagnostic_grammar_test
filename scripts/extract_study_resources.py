import csv
import json
import os

def extract_resources():
    # Paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    questions_csv_path = os.path.join(base_dir, 'doc', 'complete_question_bank_with_units.csv')
    videos_csv_path = os.path.join(base_dir, 'doc', 'question_to_video_mapping.csv')
    output_json_path = os.path.join(base_dir, 'frontend', 'src', 'data', 'grammar_resources.json')

    resources = {}

    # 1. Extract Book Info from complete_question_bank_with_units.csv
    # We only need one entry per Grammar Topic
    try:
        with open(questions_csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                topic = row.get('Grammar Topic')
                unit_details = row.get('Unit Details')
                
                if topic and unit_details and topic not in resources:
                    # Parse Unit Details if possible, or just use the string
                    # Format: "Unit 1: Present tenses - Page 1"
                    resources[topic] = {
                        "bookDetails": unit_details
                    }
    except FileNotFoundError:
        print(f"Error: Could not find {questions_csv_path}")
        return

    # 2. Extract Video Info from question_to_video_mapping.csv
    try:
        with open(videos_csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                topic = row.get('Grammar Topic')
                video_url = row.get('Video URL')
                video_name = row.get('Video Name')
                
                if topic and video_url:
                    if topic not in resources:
                         # Should have been created in step 1, but just in case
                         resources[topic] = {}
                    
                    # We'll just take the first video found for the topic for now
                    if 'videoUrl' not in resources[topic]:
                        resources[topic]['videoUrl'] = video_url
                        resources[topic]['videoTitle'] = video_name

    except FileNotFoundError:
         print(f"Error: Could not find {videos_csv_path}")
         return

    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_json_path), exist_ok=True)

    # Write to JSON
    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(resources, f, indent=2, ensure_ascii=False)
    
    print(f"Successfully wrote grammar resources to {output_json_path}")
    print(f"Mapped {len(resources)} topics.")

if __name__ == "__main__":
    extract_resources()
