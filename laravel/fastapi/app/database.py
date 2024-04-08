from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de conexión a tu base de datos MySQL
# Aquí debes reemplazar 'usuario', 'contraseña', 'localhost' y 'nombre_base_de_datos' con los valores correspondientes
SQLALCHEMY_DATABASE_URL = "mysql://root:password@172.120.19.2/sprint4laravel"

# Crear una instancia de motor
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Crear una sesión
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarar una clase base para los modelos de SQLAlchemy
Base = declarative_base()