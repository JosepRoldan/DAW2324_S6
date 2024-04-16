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

    //aquesta funcio es per començar les order per 100, a mes d'autoincrementar
    public function setNumberOrderAttribute($value)
    {
        // Este mutador establece automáticamente el valor de 'number_order' en 99 +1 más el último 'number_order' existente en la tabla
        $lastNumberOrder = self::max('number_order') ?? 99;
        $this->attributes['number_order'] = $lastNumberOrder + 1;
    }

    function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function ordersDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

   /*  function shoppingCart()
    {
        return $this->belongsTo(ShoppingCart::class);
    } */

}
