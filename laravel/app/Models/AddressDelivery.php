<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryAddress extends Model
{
    use HasFactory;

    protected $table = 'delivery_address';
    protected $fillable = [
        'idCustomers',
        'address',
        'city',
        'postcode',
        'state',
        'country',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'idCustomers', 'idCustomers');
    }
}