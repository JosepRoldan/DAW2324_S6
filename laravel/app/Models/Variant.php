<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    use HasFactory;

    protected $fillable = [
        'variantName',
        'height',
        'width',
        'price',
    ];
    public function product()
    {
        return $this->belongsTo(Product::class, 'idProduct', 'idProduct');
    }
}
