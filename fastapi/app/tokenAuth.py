from fastapi import HTTPException, Depends, status
import base64
from fastapi.security import OAuth2PasswordBearer 
from jose import JWTError, jwt
from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

API_USER = os.getenv("API_USER")
API_PASSWORD = os.getenv("API_PASSWORD")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Decodificar el token y obtener la información del usuario
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        # Capturar errores relacionados con el token
        raise credentials_exception
    
def verify_credentials(username: str, password: str):
    return username == API_USER and password == API_PASSWORD