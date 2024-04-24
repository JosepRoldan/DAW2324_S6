<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeneratedImages extends Model
{
    protected $table = 'generatedImages'; 

    protected $fillable = [
        'idGI','idCustomers','prompt','path','cost','is_saved'
    ];
}