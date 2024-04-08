import os
from dotenv import load_dotenv
import base64
from fastapi import Depends, HTTPException, status, Form
from fastapi import APIRouter, HTTPException, Security, status
from fastapi.security import APIKeyHeader

router = APIRouter()
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
API_KEYS = os.getenv("API_KEYS")

# Defineix les credencials i les codifica en base64
credentials = 'ai-art-prints-apparel:ab6e8e9e8c2d46a7d8b47913f87d45c5'
encoded_credentials = base64.b64encode(credentials.encode()).decode()

api_key_header = APIKeyHeader(name="X-API-Key")

def get_api_key(api_key_header: str = Security(api_key_header)) -> str:
    if api_key_header in [API_KEYS]:
        return api_key_header
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing API Key",
    )

@router.get("/protected")
def protected_route(api_key: str = Security(get_api_key)):
    # Process the request for authenticated users
    return {"message": "Access granted!"}


