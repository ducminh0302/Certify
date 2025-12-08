"""
Convert CFA Level 2 markdown files to TypeScript
Run: python scripts/convert_level2.py
"""

import re
import os

def parse_case_content(content: str) -> tuple[str, list[dict]]:
    """Extract case text and questions from case content"""
    # Split by ### Question
    parts = re.split(r'### Question \d+', content)
    case_text = parts[0].strip()
    
    questions = []
    question_matches = re.findall(
        r'### Question (\d+)\s*\n\*\*(.+?)\*\*\s*\n(.*?)(?=### Question|\Z)',
        content,
        re.DOTALL
    )
    
    for match in question_matches:
        q_num, q_text, options_text = match
        options = []
        for opt_match in re.finditer(r'-\s*\*\*([A-C])\.\*\*\s*(.+?)(?=\n-|\Z)', options_text, re.DOTALL):
            options.append({
                'id': opt_match.group(1).lower(),
                'label': opt_match.group(1),
                'text': opt_match.group(2).strip()
            })
        questions.append({
            'num': int(q_num),
            'text': q_text.strip(),
            'options': options
        })
    
    return case_text, questions

def parse_answers(answer_content: str) -> dict:
    """Parse answer file to get correct answers and explanations"""
    answers = {}
    matches = re.findall(
        r'### Question (\d+)\s*\n\*\*Answer:\s*([A-C])\*\*\s*\nExplanation:\s*(.+?)(?=### Question|\Z)',
        answer_content,
        re.DOTALL
    )
    for match in matches:
        q_num, answer, explanation = match
        answers[int(q_num)] = {
            'correct': answer.lower(),
            'explanation': explanation.strip()[:500]  # Truncate long explanations
        }
    return answers

def generate_typescript(cases: list, answers: dict, session: int) -> str:
    """Generate TypeScript code for exam"""
    ts_code = '''import type { Exam, Case, CaseQuestion, Difficulty } from "@/types/exam";

function q(
  caseNum: number, qNum: number, text: string,
  opts: { id: string; label: string; text: string }[],
  correct: string, explanation: string, topic: string
): CaseQuestion {
  return {
    id: `cfa-l2-s${session}-c${caseNum}-q${qNum}`,
    questionNumber: qNum,
    text, topic, difficulty: "advanced" as Difficulty,
    options: opts, correctAnswer: correct, explanation,
  };
}

'''
    # Add cases
    for i, case in enumerate(cases, 1):
        ts_code += f"const case{i}: Case = {{\n"
        ts_code += f'  id: "cfa-l2-s{session}-case{i}",\n'
        ts_code += f'  caseNumber: {i},\n'
        ts_code += f'  content: `{case["content"][:2000]}`,\n'  # Truncate
        ts_code += f'  questions: [\n'
        
        for q in case['questions']:
            q_num = q['num']
            ans = answers.get(q_num, {'correct': 'a', 'explanation': ''})
            opts_str = ', '.join([
                f'{{ id: "{o["id"]}", label: "{o["label"]}", text: "{o["text"][:100]}" }}'
                for o in q['options']
            ])
            ts_code += f'    q({i}, {q_num % 4 or 4}, "{q["text"][:200]}", [{opts_str}], "{ans["correct"]}", "{ans["explanation"][:200]}", "Topic"),\n'
        
        ts_code += '  ],\n};\n\n'
    
    return ts_code

if __name__ == "__main__":
    print("Use this as a reference - manual conversion recommended for accuracy")
