from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import requests
from pydantic import BaseModel
import httpx
from fastapi.encoders import jsonable_encoder
# from security import get_current_user

PICANOVA_BASE_URL = "https://api.picanova.com/"
BIGJPG_URL = "https://bigjpg.com/"

router = APIRouter()
templates = Jinja2Templates(directory="templates")

@router.get("/ping/picanova")
async def ping_picanova():
    response = requests.get(PICANOVA_BASE_URL)
    return {"status_code": response.status_code}

@router.get("/ping/bigJPG")
async def ping_big_jpg():
    response = requests.get(BIGJPG_URL)
    return {"status_code": response.status_code}

@router.get("/api-status", response_class=HTMLResponse)
async def read_api_status(request: Request):
    ping_picanova_result = await ping_picanova()
    ping_big_jpg_result = await ping_big_jpg()
    
    return templates.TemplateResponse("home.html", {
        "request": request,
        "ping_picanova_result": ping_picanova_result,
        "ping_big_jpg_result": ping_big_jpg_result
    })
    
class BigJpgRequest(BaseModel):
    style: str
    noise: str
    x2: str
    file_name: str
    input: str
    
# @router.post("/api/task/")
# def create_bigjpg_task(request: BigJpgRequest, current_user: dict = Depends(get_current_user)):
#     try:
#         # Enviar la solicitud a BigJPG en formato JSON
#         response = httpx.post(
#             "https://bigjpg.com/api/task/",
#             headers={'X-API-KEY': 'be6b547996ca47ac9d0bbf4bfdd5bade', 'Content-Type': 'application/json'},
#             json=jsonable_encoder(request)
#         )

#         # Verificar el código de estado de la respuesta
#         if response.status_code == 200:
#             return response.json()
#         else:
#             # Si la respuesta no es exitosa, lanza una excepción HTTP con el detalle del error
#             raise HTTPException(status_code=response.status_code, detail="Error en la solicitud a BigJPG")

#     except Exception as e:
#         # Captura otros errores y los devuelve como detalle en la excepción HTTP
#         raise HTTPException(status_code=500, detail=f"Error interno en el servidor: {str(e)}")

