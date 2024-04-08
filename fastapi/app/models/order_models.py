from pydantic import BaseModel
from typing import Optional 

class ShippingDetails(BaseModel):
    email: str
    firstname: str
    lastname: str
    company: Optional[str]
    street_primary: str
    street_secondary: Optional[str]
    city: str
    postcode: str
    country_id: int
    region_id: Optional[int]
    telephone: str

class Item(BaseModel):
    external_id: Optional[str]
    quantity: int
    variant_code: str
    customs_value: float
    file: str
    options: dict

class CreateOrderRequest(BaseModel):
    external_id: Optional[str]
    is_test: bool
    shipping_method: str
    customs_shipping_costs: float
    shipping: ShippingDetails
    items: list[Item]
