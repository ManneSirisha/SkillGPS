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


@patch('builtins.open', new_callable=mock_open)
@patch('os.path.exists', return_value=False)
def test_visitor_count_returns_1_when_no_file_exists(mock_exists, mock_file):
    res = client.get('/visitor-count')

    assert res.status_code == 200
    assert res.json() == {'count': 1}


@patch('builtins.open', new_callable=mock_open, read_data='5')
@patch('os.path.exists', return_value=True)
def test_visitor_count_reads_existing_file(mock_exists, mock_file):
    res = client.get('/visitor-count')

    assert res.status_code == 200
    assert res.json() == {'count': 6}


@patch('builtins.open', side_effect=Exception("Read error"))
@patch('os.path.exists', return_value=True)
def test_visitor_count_handles_read_exception(mock_exists, mock_file):
    res = client.get('/visitor-count')

    assert res.status_code == 200
    # Fallback to 0, then increments to 1
    assert res.json() == {'count': 1}


@patch('builtins.open', side_effect=OSError("Read-only file system"))
@patch('os.path.exists', return_value=False)
def test_visitor_count_handles_write_oserror(mock_exists, mock_file):
    res = client.get('/visitor-count')

    assert res.status_code == 200
    assert res.json() == {'count': 1}


@patch('builtins.open', side_effect=PermissionError("Permission denied"))
@patch('os.path.exists', return_value=False)
def test_visitor_count_handles_write_permissionerror(mock_exists, mock_file):
    res = client.get('/visitor-count')

    assert res.status_code == 200
    assert res.json() == {'count': 1}


@patch('builtins.open', side_effect=Exception("Generic write error"))
@patch('os.path.exists', return_value=False)
def test_visitor_count_handles_write_generic_exception(mock_exists, mock_file):
    res = client.get('/visitor-count')

    assert res.status_code == 200
    assert res.json() == {'count': 1}
