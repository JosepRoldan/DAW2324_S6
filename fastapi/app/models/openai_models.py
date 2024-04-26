from pydantic import BaseModel

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
 