<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewDetailsModel extends Model
{
    protected $table = 'orderDetails'; 

    protected $fillable = [
        'id','idOrder','idProduct','idGI','variant','quantity','priceEach','shippingPrice' 
    ];
}