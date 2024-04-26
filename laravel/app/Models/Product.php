<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'idPicanova',
        'name',
        'sku',
        'dpi',
        'type',
        'is_active',
        'ENG_description',
        'CAT_description',
        'ESP_description',
        'priority',
    ];

    protected $appends = ['thumb'];

    public function productImages()
    {
        return $this->hasMany(ProductImage::class, 'idProduct');
    }

    public function getThumbAttribute()
    {
        return $this->productImages->first()->thumb ?? null;
    }

    public function productDetails()
    {
        return $this->hasMany(ProductDetail::class, 'idProduct');
    }

    public function getCheapestProductDetail()
    {
        return $this->productDetails->sortBy('price')->first();
    }

    public function shoppingCartItems()
    {
        return $this->hasMany(ShoppingCartItems::class, 'idProduct');
    }
}
