uvicorn main:app --reload --host 0.0.0.0 --port 8000
uvicorn main:app --reload --host localhost --port 8000

uvicorn main:app --reload

USE POSTMAN TO TEST IT
http://localhost:8000/classify


{
    "comment": "Allah bilər buna hansı kimyəvi maddələr vurulub, çox pis dadır"
}