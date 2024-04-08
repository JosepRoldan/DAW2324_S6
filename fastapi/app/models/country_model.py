from sqlalchemy import Column, Integer, String
from app.database import Base
from pydantic import BaseModel

class Country(Base):
    __tablename__ = 'countries'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    code_country = Column(String(length=255))

class CountryBase(BaseModel):
    code_country: str

class Country(CountryBase):
    id: int

    class Config:
        orm_mode = True
