<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;

class OrderDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Order::factory()->count(20)->create();
    }
}
