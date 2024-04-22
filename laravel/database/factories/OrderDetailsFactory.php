<?php

namespace Database\Factories;

use App\Models\OrderDetail;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderDetailsFactory extends Factory
{
    protected $model = OrderDetail::class;

    public function definition()
    {
    
        $order = OrderDetail::inRandomOrder()->first();
        $product = Product::inRandomOrder()->first(); // Obtiene un producto aleatorio

        return [
            'idOrder' => null, // Puedes asignar el ID de la orden específica al crear la orden
            'idProduct' => $product->id,
            'idGI' => $product->idGI, // Asigna el ID del grupo de inventario del producto
            'productName' => $product->name,
            'productDetails' => $product->description,
            'quantity' => $this->faker->numberBetween(1, 10), // Cantidad aleatoria entre 1 y 10
            'priceEach' => $product->price,
            'totalPrice' => $product->price * $this->faker->numberBetween(1, 10), // Precio total aleatorio basado en la cantidad y el precio unitario
            'shippingPrice' => $this->faker->randomFloat(2, 5, 20), // Precio de envío aleatorio entre 5 y 20
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

