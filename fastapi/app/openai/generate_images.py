import requests
import os

async def guardar_imagen(url, nombre_usuario):
    # if os.path.exists(f"app/openai/temp"):
    #     return 1
    # else: 
    #     return 2
    # try:
        # Realizar la solicitud GET para obtener la imagen
        print(url)
        response = requests.get(url)
        # Verificar si la solicitud fue exitosa
        if response.status_code == 200:
            print(f"Este es el código{response.status_code}")
            with open(f"app/openai/temp/{nombre_usuario}.png", 'wb') as archivo:
                archivo.write(response.content)
            print(f"La imagen se ha descargado correctamente como '{nombre_usuario}'")
        else:
            print("Error al descargar la imagen. Código de estado:", response.status_code)
    # except Exception as e:
    #     print("Error:", e)
        return nombre_usuario

async def eliminar_imagen(nombre_usuario):
    try:
        # Comprobar si la imagen existe en la carpeta "temp"
        ruta_imagen = f"app/openai/temp/{nombre_usuario}.png"
        if os.path.exists(ruta_imagen):
            # Eliminar la imagen
            os.remove(ruta_imagen)
            return(f"La imagen '{nombre_usuario}' se ha eliminado correctamente.")
        else:
            return(f"No se encontró la imagen '{nombre_usuario}' en la carpeta 'temp'.")
    except Exception as e:
        return("Error al eliminar la imagen:", e)