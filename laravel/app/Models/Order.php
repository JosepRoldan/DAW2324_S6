<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'number_order',
        'idCustomers',
        'name',
        'address',
        'totalPrice',
        'datetime',
        'orderStatus',
    ];

    protected static function boot()
    {
        parent::boot();
    
        static::creating(function ($order) {
            $lastNumberOrder = static::max('number_order') ?? 99;
            $order->number_order = $lastNumberOrder + 1;
        });
    }

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
