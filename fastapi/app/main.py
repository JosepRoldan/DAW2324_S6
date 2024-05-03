from fastapi import FastAPI, HTTPException, Depends, status, Form, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import requests
import base64
import os
import httpx
from dotenv import load_dotenv
import requests
import json
import openai
from openai import OpenAI
from sqlalchemy.orm import Session
from prometheus_fastapi_instrumentator import Instrumentator
# IMPORTS FROM OUR FILES
from app.database import SessionLocal, engine
from app.picanova.products_picanova import fetch_products_from_api, insert_products
from app.openai.generate_images import guardar_imagen,eliminar_imagen
from app.tokenAuth import create_token, get_current_user, verify_credentials
from app.models.order_models import ShippingDetails, Item, CreateOrderRequest
from app.models.bigjpg_models import BigJpgRequest
from app.models.openai_models import BigJpgRequest,infoImatge,infoEdit
from app.models.country_model import Country
from app.security import get_api_key

app = FastAPI()
Instrumentator().instrument(app=app).expose(app=app)

load_dotenv()
credentials = os.getenv("CREDENTIALS")
encoded_credentials = base64.b64encode(credentials.encode()).decode()
client = OpenAI(api_key=os.environ.get("API_KEY_DALLE"),)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

#temporal
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/token")
def login(username: str = Form(...), password: str = Form(...)):
    if not verify_credentials(username, password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    data = {"sub": username}
    access_token = create_token(data)
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/products")
async def get_and_insert_products(current_user: dict = Depends(get_current_user)):
    try:
        products_data = await fetch_products_from_api()
        if products_data:
            await insert_products(products_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))    

@app.post("/orders")
async def create_order(order_data: CreateOrderRequest, current_user: dict = Depends(get_current_user)):
    try:
        auth_header = f'Basic {encoded_credentials}'
        
        # URL a la que se envía la solicitud POST
        url = 'https://api.picanova.com/api/beta/orders'
        
        # Realiza la solicitud POST
        response = requests.post(url, json=jsonable_encoder(order_data), headers={'Authorization': auth_header})
        
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=400, detail=f"Error en la solicitud POST: {response.text}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.post("/img-upscale")
def create_bigjpg_task(request: BigJpgRequest):
    # Enviar la solicitud en format JSON
    response = httpx.post(
        "https://bigjpg.com/api/task/",
        headers={'X-API-KEY': '8a4b24e2901f41fbb4d78b434ecf6d28', 'Content-Type': 'application/json'},
        json=jsonable_encoder(request)  # Enviar les dades com JSON
    )

    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="Error en la solicitud a BigJPG")


@app.post("/editarImage")
async def editar_imagen(infoEdit: infoEdit, 
                        api_key: str = Security(get_api_key)):
    
    try:
        ruta = await guardar_imagen(infoEdit.url ,infoEdit.idImg)
        print("Ruta de la imagen guardada:", ruta)
        with open(f"app/openai/temp/{ruta}.png", "rb") as image_file:
            response =  client.images.create_variation(
                image=image_file,
                n=2,
                size="256x256"
            )
        print("Imagen abierta")
        await eliminar_imagen(infoEdit.idImg)
        print("Imagen eliminada")
        urls = []

        for item in response.data:
            urls.append(item.url)
        
        return urls
    
    except openai.APIStatusError as e:
        return("Error al editar la imagen:", e)
    

@app.post("/generateImages")
async def generateImagesChat(infoImatge: infoImatge, 
                             api_key: str = Security(get_api_key)):
    response = client.images.generate(
          model="dall-e-2",
          prompt=infoImatge.prompt,
          n=3,
          size="256x256"
        )

    # image_url = response.data[0].url
    # return image_url
    urls = []

    for item in response.data:
        urls.append(item.url)
    
    return urls


@app.post("/reescaleImages")
async def generateImages(data: BigJpgRequest, api_key: str = Security(get_api_key)):
    data = {
        'style': data.style,
        'noise': data.noise,
        'x2': data.x2,
        'file_name': data.file_name,
        'input': data.input
    }
    r = requests.post(
            url='https://bigjpg.com/api/task/',
            headers={'X-API-KEY': '44eef18016414a4a803da2d0494de261'},
            data=json.dumps(data)
        )
    respond = (r.json())
    print(respond)
    urlImage = requests.get(url='https://bigjpg.com/api/task/' + respond)
    return urlImage
