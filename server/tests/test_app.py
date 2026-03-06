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

import pytest
from unittest.mock import patch, mock_open

def test_visitor_count_no_file(monkeypatch):
    import app as app_module
    monkeypatch.setattr(app_module, 'VISITOR_FILE', '/nonexistent/visitor_count.txt')
    # Use mock to prevent actual file write
    with patch("builtins.open", mock_open()) as mock_file:
        res = client.get('/visitor-count')
        assert res.status_code == 200
        assert res.json() == {'count': 1}
        mock_file.assert_called_with('/nonexistent/visitor_count.txt', 'w')
        mock_file().write.assert_called_with('1')

def test_visitor_count_existing_file(monkeypatch):
    import app as app_module
    monkeypatch.setattr(app_module, 'VISITOR_FILE', '/fake/visitor_count.txt')
    # Mock os.path.exists to return True
    with patch('os.path.exists', return_value=True):
        # Mock open for both read and write
        m = mock_open(read_data='5')
        with patch('builtins.open', m):
            res = client.get('/visitor-count')
            assert res.status_code == 200
            assert res.json() == {'count': 6}
            # First open is for read
            m.assert_any_call('/fake/visitor_count.txt', 'r')
            # Second open is for write
            m.assert_any_call('/fake/visitor_count.txt', 'w')
            m().write.assert_called_with('6')

def test_visitor_count_empty_file(monkeypatch):
    import app as app_module
    monkeypatch.setattr(app_module, 'VISITOR_FILE', '/fake/visitor_count.txt')
    with patch('os.path.exists', return_value=True):
        m = mock_open(read_data='')
        with patch('builtins.open', m):
            res = client.get('/visitor-count')
            assert res.status_code == 200
            assert res.json() == {'count': 1}

def test_visitor_count_invalid_file_content(monkeypatch):
    import app as app_module
    monkeypatch.setattr(app_module, 'VISITOR_FILE', '/fake/visitor_count.txt')
    with patch('os.path.exists', return_value=True):
        m = mock_open(read_data='abc')
        with patch('builtins.open', m):
            res = client.get('/visitor-count')
            assert res.status_code == 200
            assert res.json() == {'count': 1}

def test_visitor_count_read_exception(monkeypatch):
    import app as app_module
    monkeypatch.setattr(app_module, 'VISITOR_FILE', '/fake/visitor_count.txt')
    with patch('os.path.exists', return_value=True):
        m = mock_open()
        m.side_effect = [Exception("Read error"), m.return_value] # First call raises, second call (write) works
        with patch('builtins.open', m):
            res = client.get('/visitor-count')
            assert res.status_code == 200
            assert res.json() == {'count': 1}

def test_visitor_count_write_exception(monkeypatch):
    import app as app_module
    monkeypatch.setattr(app_module, 'VISITOR_FILE', '/fake/visitor_count.txt')
    with patch('os.path.exists', return_value=True):
        m = mock_open(read_data='10')
        # Setup mock so write raises an exception
        m().write.side_effect = Exception("Write error")
        with patch('builtins.open', m):
            res = client.get('/visitor-count')
            assert res.status_code == 200
            # Even if write fails, it should return the incremented count
            assert res.json() == {'count': 11}
