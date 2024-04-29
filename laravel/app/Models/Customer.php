<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customers'; // Nombre de la tabla en la base de datos

    // protected $appends = ['created_at_formatted'];


    protected $fillable = [
        'name',
        'surname',
        'username',
        'password',
        'mail',
        'phone',
        'address',
        'postcode',
        'idCountry',
        'is_validated',
        'membershipDate',
        'customerStatus'
    ];

    protected $hidden = [
        'password',
    ];


    protected $casts = [
        'is_validated' => 'boolean',
        'membershipDate' => 'datetime',
    ];

     public function getAddressDelivery ()
    {
        return $this->hasOne(AddressDelivery::class, 'idCustomers', 'id');
    }
    // public function getCreatedAtFormattedAttribute()
    // {
    //     $createdAt = $this->created_at;

    //     return [
    //         'year' => $createdAt->year,
    //         'month' => $createdAt->month,
    //         'day' => $createdAt->day,
    //         'hour' => $createdAt->hour,
    //         'minute' => $createdAt->minute,
    //         'second' => $createdAt->second,
    //         'formatted' => $createdAt->format('H:i d-m-Y'),
    //     ];
    // }
}
