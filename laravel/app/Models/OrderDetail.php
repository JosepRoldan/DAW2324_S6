<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $table = 'orders_details'; // Nombre de la vista en la base de datos

    protected $fillable = [
        'idOrder',
        'idProduct',
        'idGI',
        'productName', 
        'productDetails', 
        'quantity',
        'priceEach',
        'totalPrice',
        'shippingPrice',
    ];

    public function order() 
    {
        return $this->belongsTo(Order::class);
    }
}
