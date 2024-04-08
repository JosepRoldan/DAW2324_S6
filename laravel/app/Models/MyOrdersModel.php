<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MyOrdersModel extends Model
{
    protected $table = 'orders'; // Nombre de la tabla en la base de datos
    

    protected $fillable = [
        'idOrder', 'idCustomer','datetime','orderStatus' // Lista de campos que se pueden llenar de forma masiva
    ];
}