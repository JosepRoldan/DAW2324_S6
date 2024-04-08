<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $timestamps = false;

    function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    function product()
    {
        return $this->belongsToMany(Product::class);
    }

    function shoppingCart()
    {
        return $this->belongsTo(ShoppingCart::class);
    }

}
