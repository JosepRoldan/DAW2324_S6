<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Customer; // Asegúrate de importar el modelo Customer
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    {
        return [
            'number_order' => $this->faker->unique()->randomNumber(5),
            'idCustomers' => Customer::factory(),
            'name' => $this->faker->name,
            'address' => $this->faker->address,
            'totalPrice' => $this->faker->randomFloat(2, 10, 500),
            'datetime' => $this->faker->dateTimeThisYear(),
            'orderStatus' => $this->faker->randomElement(['pending', 'processing', 'completed']),
        ];
    }
}
