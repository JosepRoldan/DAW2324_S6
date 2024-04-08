<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewDetailsModel extends Model
{
    protected $table = 'orderDetails'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        'idOD','idOrder','idProduct','idGI','idVariant','quantity','priceEach','shippingPrice' // Lista de campos que se pueden llenar de forma masiva
    ];
}