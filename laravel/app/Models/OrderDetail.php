<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;
    protected $table = 'orders_details'; // Nombre de la vista en la base de datos
    public $timestamps = false;

    protected $fillable = [
        'idOrder',
        'idProduct',
        'idGI',
        'productName', 
        'idVariant', 
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
