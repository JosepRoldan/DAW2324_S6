from fastapi import FastAPI, HTTPException, Depends
# from app.plantilles import router as plantilles_router
from images import router as images_router
from security import router as security_router
from fastapi.middleware.cors import CORSMiddleware
import crud
from models import Country
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from pydantic import BaseModel



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(security_router)
app.include_router(images_router)
#  app.include_router(plantilles_router)

class Country(BaseModel):
    id: int
    code_country: str

    class Config:
        arbitrary_types_allowed = True

@app.get("/products")
def read_root():
    return {"producte1": "asdfasdfsadfdsaf"}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

@app.put("/country/{country_code}", response_model=Country)
def update_country(country_code: str, db: Session = Depends(get_db)):
    new_country = crud.create_country(db, country_code=country_code)
    if new_country:
        return new_country.__dict__
    else:
        raise HTTPException(status_code=404, detail="No se pudo crear el país")