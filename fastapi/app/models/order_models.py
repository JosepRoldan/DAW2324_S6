from sqlalchemy import DateTime, Column, Boolean, Integer, String, MetaData, Table, Float, Enum, ForeignKeyConstraint, func
from sqlalchemy.dialects.mysql import ENUM

metadata = MetaData()

# Modelo para la tabla 'orders'
orders_table = Table(
    'orders', metadata,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('idOrderPicanova', String),
    Column('idCustomer', String, nullable=True),
    Column('datetime', DateTime, default=func.now()),
    Column('orderStatus', String),
)

# Modelo para la tabla 'orderDetails'
order_details_table = Table(
    'order_details', metadata,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('idOrder', Integer, nullable=False),
    Column('idProduct', Integer, nullable=False),
    #Column('idGI', Integer, nullable=False),
    Column('idVariant', Integer, nullable=True),
    Column('quantity', Integer, nullable=False),
    Column('priceEach', Float, nullable=False),
    Column('shippingPrice', Float),
    ForeignKeyConstraint(['idOrder'], ['orders.idOrders']),
    ForeignKeyConstraint(['idProduct'], ['products.id']),
    #ForeignKeyConstraint(['idGI'], ['some_other_table.id']),
    ForeignKeyConstraint(['idVariant'], ['variants.id'])
)
