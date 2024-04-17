<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class BuyingProcess extends Model
{
    public function getAllClients()
    {
        return DB::table('customers')->select('*')->get();
    }

    public function addClientInfo($data)
    {
        return DB::table('customers')->insert($data);
    }
}
