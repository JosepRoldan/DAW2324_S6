import os
from fastapi import APIRouter, Body, HTTPException
from fastapi.responses import JSONResponse
from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi import APIRouter, Security, status, Depends
from security import get_api_key
import requests
import json
import openai

router = APIRouter()
load_dotenv()
client = OpenAI(api_key=os.environ.get("API_KEY_DALLE"),)

class BigJpgRequest(BaseModel):
    style: str
    noise: str
    x2: str
    file_name: str
    input: str
    
class infoImatge(BaseModel):
    prompt: str
    
class infoEdit(BaseModel):
    url: str
    nombre_usuari: str
    idImg: str
    

async def guardar_imagen(url, nombre_usuario):
    try:
        # Realizar la solicitud GET para obtener la imagen
        response = requests.get(url)
        # Verificar si la solicitud fue exitosa
        if response.status_code == 200:
            # Guardar la imagen en el archivo especificado
            with open(f"temp/{nombre_usuario}.png", 'wb') as archivo:
                archivo.write(response.content)
            print(f"La imagen se ha descargado correctamente como '{nombre_usuario}'")
        else:
            print("Error al descargar la imagen. Código de estado:", response.status_code)
    except Exception as e:
        print("Error:", e)
    return nombre_usuario

async def eliminar_imagen(nombre_usuario):
    try:
        # Comprobar si la imagen existe en la carpeta "temp"
        ruta_imagen = f"temp/{nombre_usuario}.png"
        if os.path.exists(ruta_imagen):
            # Eliminar la imagen
            os.remove(ruta_imagen)
            return(f"La imagen '{nombre_usuario}' se ha eliminado correctamente.")
        else:
            return(f"No se encontró la imagen '{nombre_usuario}' en la carpeta 'temp'.")
    except Exception as e:
        return("Error al eliminar la imagen:", e)
    
    
@router.post("/generateImagesFake")
async def generateImagesFake(infoImatge: infoImatge):
        response = [] 
        if infoImatge.prompt == "perro" :
            response =[ 
                
                        "https://www.mascotasanasydivertidas.com/wp-content/uploads/sites/12/2020/11/perro.png",
                        "https://www.mascotasanasydivertidas.com/wp-content/uploads/sites/12/2020/11/perro.png",
                        "https://www.mascotasanasydivertidas.com/wp-content/uploads/sites/12/2020/11/perro.png"
                
            ]
        elif infoImatge.prompt == "gato":
            response =[ 
                
            
                        "https://nutricione.es/img/cms/Home%20Nutricione/Hom/Categor%C3%ADa%20gatos/Nutricione-cabecera-categoria-gato-1.png",
                        "https://nutricione.es/img/cms/Home%20Nutricione/Hom/Categor%C3%ADa%20gatos/Nutricione-cabecera-categoria-gato-1.png",
                        "https://nutricione.es/img/cms/Home%20Nutricione/Hom/Categor%C3%ADa%20gatos/Nutricione-cabecera-categoria-gato-1.png"
                        
            ]

            
        return response 
    
@router.post("/editarImagesFake")
async def generateImagesFake(infoEdit: infoEdit, api_key: str = Security(get_api_key)):
          
        if infoEdit.url == "https://nutricione.es/img/cms/Home%20Nutricione/Hom/Categor%C3%ADa%20gatos/Nutricione-cabecera-categoria-gato-1.png" :
            response =[ 
                
                        "https://img.freepik.com/fotos-premium/gato-gordo-sienta-mesa_349893-1295.jpg?w=740",
                        "https://img.freepik.com/fotos-premium/gato-gordo-sienta-mesa_349893-1295.jpg?w=740",
                        "https://img.freepik.com/fotos-premium/gato-gordo-sienta-mesa_349893-1295.jpg?w=740"
                
            ]
        elif infoEdit.url == "https://www.mascotasanasydivertidas.com/wp-content/uploads/sites/12/2020/11/perro.png":
            response =[ 
                
            
                        "https://s3.ppllstatics.com/diariosur/www/pre2017/multimedia/noticias/201406/18/media/cortadas/perro-feoo--235x235.jpg",
                        "https://s3.ppllstatics.com/diariosur/www/pre2017/multimedia/noticias/201406/18/media/cortadas/perro-feoo--235x235.jpg",
                        "https://s3.ppllstatics.com/diariosur/www/pre2017/multimedia/noticias/201406/18/media/cortadas/perro-feoo--235x235.jpg"
                        
            ]
 
        return response 

@router.post("/editarImage")
async def editar_imagen(infoEdit: infoEdit, 
                        api_key: str = Security(get_api_key)):
    
    try:
        ruta = await guardar_imagen(infoEdit.url ,infoEdit.idImg)
        print("Ruta de la imagen guardada:", ruta)
        with open("temp/" + ruta + ".png", "rb") as image_file:
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
    

@router.post("/generateImages")
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


@router.post("/reescaleImages")
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
