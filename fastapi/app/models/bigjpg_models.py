from pydantic import BaseModel

class BigJpgRequest(BaseModel):
    style: str
    noise: str
    x2: str
    file_name: str
    input: str