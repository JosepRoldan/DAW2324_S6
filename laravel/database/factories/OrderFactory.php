<?php
// database/factories/OrderFactory.php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    {
        return [
            'orderNumber' => $this->faker->unique()->numberBetween(100, 999),
            'idCustomers' => $this->faker->numberBetween(1, 50),
            'name' => $this->faker->firstName,
            'surname' => $this->faker->lastName,
            'address' => $this->faker->address,
            'totalPrice' => $this->faker->randomFloat(2, 10, 1000),
            'datetime' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'orderStatus' => $this->faker->randomElement(['PreOrder', 'InProgress', 'Sent', 'Delivered','Canceled']),
        ];
    }
}
