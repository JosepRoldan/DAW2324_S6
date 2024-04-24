<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MyImagesModel extends Model
{
    protected $table = 'generatedImages'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        'idGI', 'idCustomers','prompt','path','is_saved' // Lista de campos que se pueden llenar de forma masiva
    ];

    // Aquí puedes definir relaciones u otros métodos necesarios
}
