import sys, os
from fastapi.testclient import TestClient
from unittest.mock import patch, mock_open

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


def test_visitor_count_oserror_on_write():
    with patch('os.path.exists', return_value=False):
        with patch('builtins.open', side_effect=OSError("Mocked OSError")):
            res = client.get('/visitor-count')
            assert res.status_code == 200
            assert res.json() == {'count': 1}

def test_visitor_count_permissionerror_on_write():
    with patch('os.path.exists', return_value=False):
        with patch('builtins.open', side_effect=PermissionError("Mocked PermissionError")):
            res = client.get('/visitor-count')
            assert res.status_code == 200
            assert res.json() == {'count': 1}

def test_visitor_count_generic_exception_on_write():
    with patch('os.path.exists', return_value=False):
        with patch('builtins.open', side_effect=Exception("Mocked Exception")):
            res = client.get('/visitor-count')
            assert res.status_code == 200
            assert res.json() == {'count': 1}

def test_visitor_count_exception_on_read():
    with patch('os.path.exists', return_value=True):
        m = mock_open()
        m.side_effect = [Exception("Mocked Read Exception"), m.return_value]
        with patch('builtins.open', m):
            res = client.get('/visitor-count')
            assert res.status_code == 200
            assert res.json() == {'count': 1}


def test_visitor_count_success_read_and_write():
    with patch('os.path.exists', return_value=True):
        m = mock_open(read_data="42")
        with patch('builtins.open', m):
            res = client.get('/visitor-count')
            assert res.status_code == 200
            assert res.json() == {'count': 43}

def test_visitor_count_success_file_not_exists():
    with patch('os.path.exists', return_value=False):
        m = mock_open()
        with patch('builtins.open', m):
            res = client.get('/visitor-count')
            assert res.status_code == 200
            assert res.json() == {'count': 1}
