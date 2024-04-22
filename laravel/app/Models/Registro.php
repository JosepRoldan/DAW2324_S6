<?php
// app/Models/Registro.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Registro extends Model
{
    protected $table = 'customers';
    public function getAllClients()
    {
        return DB::table('customers')->select('username', 'mail')->get();
    }
    public function addClient($data)
    {
        return DB::table('customers')->insert($data);
    }
    
    public function solicitarId($clientName)
    {
        return DB::table('customers')->where('username', $clientName)->value('id');
        
    }
}
// Esto es en caso de que necesite conectarme a otra base de datos diferente para poder usar ambas, por defecto
// laravel usa la BDDD configurada.
// class registro extends Model
// {
//     protected $table = 'your_table_name';
//     protected $primaryKey = 'id';
//     public $timestamps = true;
//     protected $connection = 'mysql2';
// }
