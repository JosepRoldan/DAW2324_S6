from fastapi import Depends, HTTPException
import httpx 
import base64

### IMPORTS FROM OUR FILES ###
from app.tokenAuth import get_current_user
from app.database import engine
from app.models.order_models import metadata, orders_table, order_details_table

PICANOVA_ORDERS_URL = "https://api.picanova.com/api/beta/orders"

# Defineix les credencials i les codifica en base64
credentials = 'ai-art-prints-apparel:ab6e8e9e8c2d46a7d8b47913f87d45c5'
encoded_credentials = base64.b64encode(credentials.encode()).decode()

async def fetch_orders_from_api():
    try:
        url = PICANOVA_ORDERS_URL
        async with httpx.AsyncClient() as client:
            response = await client.get(
                url,
                headers={'Authorization': f'Basic {encoded_credentials}'}
            )
            if response.status_code == 200:
                response_data = response.json()
                orders_data = response_data.get('data', [])
                return orders_data
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

async def get_order_details_from_api(order_id: int) -> dict:
    url = f"{PICANOVA_ORDERS_URL}/{order_id}"
    async with httpx.AsyncClient() as client:
        response = await client.get(
            url,
            headers={'Authorization': f'Basic {encoded_credentials}'}
        )
        if response.status_code == 200:
            return response.json().get('data', {})
        return {}

async def insert_orders(orders_data):
    with engine.connect() as connection:
        for order_data in orders_data:
            try:
                order_id = insert_order(connection, order_data)
                insert_order_details(connection, order_id, order_data.get('items', []))
            except Exception as e:
                print(f"Error al insertar la orden {order_data.get('id')}: {e}")

def insert_order(connection, order_data):
    id = order_data.get('id')
    customer_id = order_data.get('external_id')
    order_status = order_data.get('status')

    if id is not None:
        ins_order = orders_table.insert().values(
            idOrderPicanova=id,
            idCustomer="customer_id",
            orderStatus=order_status
        )
        result = connection.execute(ins_order)
        return result.inserted_primary_key[0]
    else:
        raise ValueError("Order ID is missing")
    
def insert_order_details(connection, order_id, items_data):
    for item_data in items_data:
        product_id = item_data.get('variant_id')
        gi_id = None
        variant_id = None
        quantity = item_data.get('quantity')
        price_each = item_data.get('price')
        shipping_price = None

        ins_details = order_details_table.insert().values(
            idOrder=order_id,
            idProduct=product_id,
            #idGI=gi_id,
            idVariant=variant_id,
            quantity=quantity,
            priceEach=price_each,
            shippingPrice=shipping_price
        )

        connection.execute(ins_details)