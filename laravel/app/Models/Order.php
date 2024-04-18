<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'idOrderPicanova',
        'customerName',
        'datetime',
        'orderStatus',
    ];

    public $timestamps = true;

    public function Customer()
    {
        return $this->belongsTo(Customer::class, 'idCustomer', 'id');
    }
}
