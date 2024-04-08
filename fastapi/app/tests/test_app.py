from starlette.testclient import TestClient
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK
from app.main import app

client = TestClient(app)


def test_login_success():
    """Test the login with valid credentials."""
    username = "alumne"
    password = "2b8af5289aa93fc62eae989b4dcc9725"
    response = client.post("/token", data={"username": username, "password": password})
    assert response.status_code == HTTP_200_OK
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_login_invalid_credentials():
    """Test the login with invalid credentials."""
    username = "user"
    password = "5g7bd5449aa93fc62eae989b4dcc2478"
    response = client.post("/token", data={"username": username, "password": password})
    assert response.status_code == HTTP_401_UNAUTHORIZED
    assert response.json()["detail"] == "Invalid credentials"