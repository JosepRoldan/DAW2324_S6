<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddressDelivery extends Model
{
    use HasFactory;

    protected $table = 'address_deliveries';
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
        return $this->belongsTo(Customer::class, 'id', 'idCustomers');
    }
}