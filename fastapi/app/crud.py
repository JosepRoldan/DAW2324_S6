# from sqlalchemy.orm import Session
# from app.models import Country

# def create_country(db: Session, country_code: str):
#     country = Country(code_country=country_code)
#     # Añadimos el nuevo país a la sesión
#     db.add(country)
#     # Confirmamos los cambios en la base de datos
#     db.commit()
#     # Refrescamos el objeto para asegurarnos de que refleje los cambios realizados en la base de datos
#     db.refresh(country)
#     # Devolvemos el objeto del país creado
#     return country