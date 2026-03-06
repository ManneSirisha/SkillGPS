import sys, os
from fastapi.testclient import TestClient

# ensure repo server path is on sys.path so tests can import `app`
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app

client = TestClient(app)

SAMPLE = {
    "interests": {"numbers": True, "building": True, "design": False, "explaining": False, "logic": True},
    "workStyle": {"environment": "Solo", "structure": "Structured", "roleType": "Desk Job"},
    "intent": {"afterEdu": "job", "workplace": "startup", "nature": "applied"},
    "confidence": {"math": 7, "coding": 6, "communication": 5}
}

def test_predict_returns_200_and_predictions():
    # Calling the rule-based endpoint directly
    res = client.post('/predict', json=SAMPLE)
    
    assert res.status_code == 200
    body = res.json()
    
    assert 'predictions' in body
    assert isinstance(body['predictions'], list)
    # Rule-based logic should return top 3
    assert len(body['predictions']) == 3
    
    p = body['predictions'][0]
    assert 'career' in p and 'prob' in p
    # With the sample input (numbers, logic, building, coding confidence), 
    # Backend Developer or Data Scientist should likely be top.
    print(f"Top prediction: {p['career']} ({p['prob']})")
    assert p['career'] in ['Data Scientist', 'Backend Developer']

def test_predict_interest_scoring():
    # Only interests, test keyword match
    sample = {
        "interests": {"math": True, "logic": True, "art": False},
        "workStyle": {},
        "intent": {},
        "confidence": {}
    }
    res = client.post('/predict', json=sample)
    assert res.status_code == 200

    predictions = res.json()['predictions']
    # 'math' and 'logic' strongly points to Data Scientist (2 matches)
    # 'logic' points to Backend Developer (1 match)
    assert predictions[0]['career'] == 'Data Scientist'
    assert predictions[1]['career'] == 'Backend Developer'

def test_predict_confidence_scoring():
    # Confidence level >= 6 adds 0.5 points
    # Confidence < 6 adds 0 points
    sample = {
        "interests": {},
        "workStyle": {},
        "intent": {},
        "confidence": {"coding": 6, "design": 5}
    }
    res = client.post('/predict', json=sample)
    assert res.status_code == 200

    predictions = res.json()['predictions']
    # 'coding' >= 6 boosts Frontend Developer and Backend Developer
    # 'design' < 6 should not boost any career
    top_careers = [p['career'] for p in predictions[:2]]
    assert 'Frontend Developer' in top_careers
    assert 'Backend Developer' in top_careers

    # UX/UI Designer might be in the top 3 due to ties, but its probability should be 0.0
    for p in predictions:
        if p['career'] not in ['Frontend Developer', 'Backend Developer']:
            assert p['prob'] == 0.0

def test_predict_workstyle_intent_bonus():
    # Test workStyle (roleType) and intent (nature) bonus
    sample = {
        "interests": {},
        "workStyle": {"roleType": "Desk Job"}, # +0.5 for Data Scientist, Frontend, Backend, UX/UI
        "intent": {"nature": "management"},   # +1.0 for Product Manager
        "confidence": {}
    }
    res = client.post('/predict', json=sample)
    assert res.status_code == 200

    predictions = res.json()['predictions']
    # Product Manager gets 1.0 from nature
    # Others with Desk Job get 0.5
    assert predictions[0]['career'] == 'Product Manager'
    assert predictions[1]['prob'] > 0 # desk jobs

def test_predict_empty_or_unknown_survey():
    # Test edge case with unknown keywords and empty fields
    sample = {
        "interests": {"unknown_interest": True},
        "workStyle": {"roleType": "Unknown"},
        "intent": {"nature": "Unknown"},
        "confidence": {"unknown_skill": 10}
    }
    res = client.post('/predict', json=sample)
    assert res.status_code == 200

    predictions = res.json()['predictions']
    # Total score should be 0 for all, so prob is 0.0
    for p in predictions:
        assert p['prob'] == 0.0
