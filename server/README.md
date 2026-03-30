# SkillGPS Inference API

Simple FastAPI server that loads the trained model and serves `/predict`.

Run locally:

```bash
cd server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

POST /predict with JSON body matching the survey shape, e.g.:

{
  "interests": { "numbers": true, "building": false, ...},
  "workStyle": {"environment": "Solo", "structure": "Flexible", "roleType": "Desk Job"},
  "intent": {"afterEdu": "job", "workplace": "startup", "nature": "applied"},
  "confidence": {"math": 7, "coding": 5, "communication": 6}
}

Response:

{
  "predictions": [ { "career": "Data Scientist", "prob": 0.64 }, ... ]
}
