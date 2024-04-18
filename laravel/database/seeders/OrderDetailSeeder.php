<?php
namespace Database\Seeders;

use App\Models\OrderDetails;
use Illuminate\Database\Seeder;


class OrderDetailSeeder extends Seeder
{
    public function run()
    {
        OrderDetails::factory()->count(50)->create();
    }
}
