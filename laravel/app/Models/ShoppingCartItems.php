<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShoppingCartItems extends Model
{

    protected $table = 'shoppingCartItems';

    protected $fillable = [
        'idCart',
        'idProduct',
        'idVariant',
        'idGI',
        'quantity',
        'price'
    ];
    public function shoppingCart()
    {
        return $this->belongsTo(ShoppingCart::class);
    }
    public function products()
    {
        return $this->belongsTo(Product::class);
    }
  
    public function product()
    {
        return $this->belongsTo(Product::class, 'idProduct');
    }

    public function imagenes()
    {
        return $this->belongsTo(MostrarImagenesModel::class);
    }

}