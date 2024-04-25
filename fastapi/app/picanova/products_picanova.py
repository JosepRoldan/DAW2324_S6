from fastapi import Depends, HTTPException
import httpx, base64

### IMPORTS FROM OUR FILES ###
from app.tokenAuth import get_current_user
from app.database import engine
# from models import metadata, products_table, products_images_table, product_details_table, product_options_table, product_option_values_table
from app.models.product_models import metadata, products_table, products_images_table, product_details_table, product_options_table, product_option_values_table

PICANOVA_PRODUCTS_URL = "https://api.picanova.com/api/beta/products"

# Defineix les credencials i les codifica en base64
credentials = 'ai-art-prints-apparel:ab6e8e9e8c2d46a7d8b47913f87d45c5'
encoded_credentials = base64.b64encode(credentials.encode()).decode()

async def fetch_products_from_api():
    try:
        url = PICANOVA_PRODUCTS_URL
      
        async with httpx.AsyncClient() as client:
            response = await client.get(
                url,
                headers={'Authorization': f'Basic {encoded_credentials}'}
            )
            if response.status_code == 200:
                response_data = response.json()
                products_data = response_data.get('data', [])
                return products_data
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")


async def get_product_details_from_api(product_id: int) -> dict:
    url = (f"{PICANOVA_PRODUCTS_URL}/{product_id}")
    async with httpx.AsyncClient() as client:
        response = await client.get(
            url,
            headers={'Authorization': f'Basic {encoded_credentials}'}
        )
        if response.status_code == 200:
            return response.json().get('data', {})
        return {}
    
async def get_product_options_from_api(product_id: int, product_data) -> dict:
    url = (f"{PICANOVA_PRODUCTS_URL}/{product_id}")
    async with httpx.AsyncClient() as client:
        response = await client.get(
            url,
            headers={'Authorization': f'Basic {encoded_credentials}'}
        )
        if response.status_code == 200:
            return response.json().get('options', {})
    
async def insert_products(products_data):
    with engine.connect() as connection:
        for product_data in products_data:
            try:
                product_id = insert_product(connection, product_data)
                insert_product_images(connection, product_id, product_data.get('images', []))
                product_details_data = await get_product_details_from_api(product_data.get('id'))
                insert_product_details(connection, product_id, product_details_data)
            except Exception as e:
                print(f"Error al insertar el producto {product_data.get('id')}: {e}")

def insert_product(connection, product_data):
    idPicanova = product_data.get('id')
    name = product_data.get('name')
    sku = product_data.get('sku')
    dpi = product_data.get('dpi')
    product_type = product_data.get('type')

    if idPicanova is not None:
        ins_product = products_table.insert().values(
            idPicanova=idPicanova,
            name=name,
            sku=sku,
            dpi=dpi,
            type=product_type
        )
        result = connection.execute(ins_product)
        return result.inserted_primary_key[0]
    else:
        raise ValueError("Product ID is missing")

def insert_product_images(connection, product_id, images_data):
    for image_data in images_data:
        picanova_image_id = image_data.get('id')
        original = image_data.get('original')
        thumb = image_data.get('thumb')

        if picanova_image_id is not None:
            ins_image = products_images_table.insert().values(
                idProduct=product_id,
                idPicanova=picanova_image_id,
                original=original,
                thumb=thumb
            )
            connection.execute(ins_image)
        else:
            print(f"Missing image ID for product {product_id}")

def insert_product_details(connection, product_id, product_details_data):
    for product_detail_data in product_details_data:
        code = product_detail_data.get('code')
        variant_id = product_detail_data.get('variant_id')
        variant_code = product_detail_data.get('variant_code')
        sku=product_detail_data.get('sku')
        name=product_detail_data.get('name')
        format_width=product_detail_data.get('printfile', {}).get('format_width')
        format_height=product_detail_data.get('printfile', {}).get('format_height')
        price=product_detail_data.get('price')
        currency=product_detail_data.get('price_details', {}).get('currency')
        formatted_price=product_detail_data.get('price_details', {}).get('formatted')
        price_in_subunit=product_detail_data.get('price_details', {}).get('in_subunit')

        ins_details = product_details_table.insert().values(
            idProduct=product_id,
            code=code,
            variant_id=variant_id,
            variant_code=variant_code,
            sku=sku,
            name=name,
            format_width=format_width,
            format_height=format_height,
            price=price,
            currency=currency,
            formatted_price=formatted_price,
            price_in_subunit=price_in_subunit
        )

        connection.execute(ins_details)

        options_data = product_detail_data.get('options', {})

        if options_data:
            for option_id, option_data in options_data.items():
                name = option_data['name']
                image = option_data['image']
                description = option_data['description']
                is_required = option_data['is_required']
                ins_options = product_options_table.insert().values(
                    idProduct=product_id,
                    variant_id=variant_id,
                    option_id_picanova=option_id,
                    name=name,
                    image=image,
                    description=description,
                    is_required=is_required
                )
                connection.execute(ins_options)
                option_values = options_data.get(option_id, {}).get('values', [])
                if option_values:
                    for value in option_values:
                        idValue = value.get('id')
                        name = value.get('name')
                        sku = value.get('sku')
                        image_id = value.get('image', {}).get('id', None)
                        image_original = value.get('image', {}).get('original', None)
                        price = value.get('price')
                        currency = value.get('price_details', {}).get('currency')
                        formatted_price = value.get('price_details', {}).get('formatted')
                        price_in_subunit = value.get('price_details', {}).get('in_subunit')
                        
                        ins_option_values = product_option_values_table.insert().values(
                            idOption = option_id,
                            option_value_id_picanova = idValue,
                            name = name,
                            sku = sku,
                            image_id = image_id,
                            image_original = image_original,
                            price = price,
                            currency = currency,
                            formatted_price = formatted_price,
                            price_in_subunit = price_in_subunit
                        )
                        connection.execute(ins_option_values)
                else:
                    print("No option values available.")
        else:
            print("No options data available.")