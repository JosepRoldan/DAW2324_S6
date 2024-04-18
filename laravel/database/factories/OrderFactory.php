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
            'idOrderPicanova' => $this->faker->unique()->numberBetween(100000000, 999999999),
            'customerName' => Customer::query()->inRandomOrder()->value('name'), // Obtiene un nombre aleatorio de la tabla customers
            'datetime' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'orderStatus' => $this->faker->randomElement(['Pending', 'Processing', 'Shipped']),
        ];
    }
}
