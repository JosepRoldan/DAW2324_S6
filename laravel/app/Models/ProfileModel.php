<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileModel extends Model
{
    protected $table = 'customers'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        'idCustomers','mail' // Lista de campos que se pueden llenar de forma masiva
    ];
}
