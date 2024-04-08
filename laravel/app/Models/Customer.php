<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';
    protected $primaryKey = 'idCustomers'; // Especifica el nombre de la clave primaria

    protected $fillable = [
        'name', 'email', 'password',
    ];
    public $timestamps = false;

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function shoppingCart()
    {
        return $this->hasOne(ShoppingCart::class);
    }
}
