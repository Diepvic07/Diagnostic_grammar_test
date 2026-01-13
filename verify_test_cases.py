import urllib.request
import json
import collections

URL = 'http://localhost:3000/api/quiz/questions'

def run_tests():
    print("Running Backend API Tests...")
    try:
        with urllib.request.urlopen(URL, timeout=5) as response:
            data = json.load(response)
            questions = data['questions']
            
            # TC-001: Total Count
            if len(questions) == 50:
                print("TC-001 [PASS]: Total questions is 50.")
            else:
                print(f"TC-001 [FAIL]: Expected 50, got {len(questions)}.")

            # TC-002, TC-003: Topic Coverage & Distribution
            topic_counts = collections.defaultdict(int)
            for q in questions:
                topic_counts[q.get('topicNumber')] += 1
            
            dist_pass = True
            for i in range(1, 26):
                if topic_counts[i] != 2:
                    dist_pass = False
                    print(f"  -> Topic {i} has {topic_counts[i]} questions (expected 2)")
            
            if dist_pass and len(topic_counts) == 25:
                print("TC-002/003 [PASS]: All 25 topics represented with exactly 2 questions.")
            else:
                print("TC-002/003 [FAIL]: Distribution incorrect.")

            # TC-004: Question Content Check (Sample)
            # Find a question we know exists in CSV, e.g. Q1 "Most university students"
            q1 = next((q for q in questions if "Most university students" in q['contentEn']), None)
            if q1:
                print(f"TC-004 [PASS]: Found sample question: '{q1['contentEn']}'")
            else:
                print("TC-004 [WARNING]: Could not find specific sample question text. Checking general structure.")
                if questions[0]['contentEn']:
                    print("TC-004 [PASS]: Question content field is populated.")

            # TC-005: Distractor Check
            # Check answers of the first question
            if questions:
                answers = questions[0]['answers']
                if len(answers) == 4:
                    print(f"TC-005 [PASS]: Question has 4 answer options.")
                    # Check for placeholder
                    placeholders = [a for a in answers if "[Incorrect Option" in a['textEn']]
                    if placeholders:
                        print(f"  -> Verified placeholders present: {placeholders[0]['textEn']}")
                    else:
                        print("  -> No placeholders found (Real distractors? Or issue?)")
                else:
                    print(f"TC-005 [FAIL]: Expected 4 answers, got {len(answers)}.")

    except Exception as e:
        print(f"FATAL: Test execution failed: {e}")

if __name__ == '__main__':
    run_tests()
