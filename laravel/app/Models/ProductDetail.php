<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    protected $table = 'product_details'; // Nombre de la tabla en la base de datos
    

    protected $fillable = [
        'idProduct', 'productName','category','img_1' // Lista de campos que se pueden llenar de forma masiva
    ];
}