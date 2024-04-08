from sqlalchemy import DateTime, Column, Boolean, Integer, String, MetaData, Table, Float
from datetime import datetime

metadata = MetaData()

### TAULA PRODUCTES ###
products_table = Table(
    'products', metadata,
    Column('id', Integer, primary_key=True),
    Column('idPicanova', String(255)), 
    Column('name', String(255)),
    Column('sku', String(255)),
    Column('dpi', Integer),
    Column('type', String(255)),
    Column('is_active', Boolean, default=False), 
    Column('created_at', DateTime, default=datetime.now),
    Column('updated_at', DateTime, default=datetime.now, onupdate=datetime.now), 
)

### TAULA IMATGES PRODUCTES ###
products_images_table = Table(
    'product_images', metadata,
    Column('id', Integer),
    Column('idProduct', Integer),
    Column('idPicanova', String(255)),
    Column('original', String(255)),
    Column('thumb', String(255)),
    Column('benefits_margin', Float(8, 2)),
    Column('created_at', DateTime, default=datetime.now),
    Column('updated_at', DateTime, default=datetime.now, onupdate=datetime.now),
)

### TAULA DETALLS PRODUCTES ###
product_details_table = Table(
    'product_details', metadata,
    Column('id', Integer),
    Column('idProduct', Integer), 
    Column('code', String(255)),
    Column('variant_id', Integer),
    Column('variant_code', String(255)),
    Column('sku', String(255)),
    Column('name', String(255)),
    Column('format_width', Integer),
    Column('format_height', Integer),
    Column('price', Float),
    Column('currency', String(3)),
    Column('formatted_price', String(20)),
    Column('price_in_subunit', Integer),
    Column('created_at', DateTime, default=datetime.now),
    Column('updated_at', DateTime, default=datetime.now, onupdate=datetime.now),
)

### TAULA OPCIONS PRODUCTES ###
product_options_table = Table(
    'product_options', metadata,
    Column('id', Integer),
    Column('idProduct', Integer),
    Column('variant_id', Integer),
    Column('option_id_picanova', String(255)),
    Column('name', String(255)),
    Column('image', String(255), nullable=True),
    Column('description', String(255), nullable=True),
    Column('is_required', Boolean),
    Column('created_at', DateTime, default=datetime.now),
    Column('updated_at', DateTime, default=datetime.now, onupdate=datetime.now),
)

### TAULA VALORS OPCIONS PRODUCTES ###
product_option_values_table = Table(
    'product_option_values', metadata,
    Column('id', Integer),
    Column('idOption', Integer),
    Column('option_value_id_picanova', String(255)),
    Column('name', String(255)),
    Column('sku', String(255)),
    Column('image_id', String(255)),
    Column('image_original', String(255)),
    Column('price', Float),
    Column('currency', String(255)),
    Column('formatted_price', String(255)),
    Column('price_in_subunit', Integer),
    Column('created_at', DateTime, default=datetime.now),
    Column('updated_at', DateTime, default=datetime.now, onupdate=datetime.now),
)