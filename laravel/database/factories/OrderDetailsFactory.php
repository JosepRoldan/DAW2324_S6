<?php

namespace Database\Factories;

use App\Models\OrderDetails;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderDetailsFactory extends Factory
{
    protected $model = OrderDetails::class;

    public function definition()
    {
    
        $order = OrderDetails::inRandomOrder()->first();

        return [
            'idOrder' => Order::factory(),
            'idProduct' => $this->faker->numberBetween(1, 50),
            'idVariant' => $this->faker->randomNumber(4),
            'quantity' => $this->faker->numberBetween(1, 10),
            'priceEach' => $this->faker->randomFloat(2, 10, 100),
            'shippingPrice' => $this->faker->randomFloat(2, 5, 20),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

     /**
     * Indicar valores específicos para las claves foráneas.
     *
     * @param  int  $orderId
     * @param  int  $productId
     * @return \Database\Factories\OrderDetailsFactory
     */
    public function forOrderAndProduct($orderId, $productId)
    {
        return $this->state([
            'idOrder' => $orderId,
            'idProduct' => $productId,
        ]);
    }
}

