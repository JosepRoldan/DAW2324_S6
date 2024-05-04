<?php

namespace Database\Factories;

use App\Models\GeneratedImages;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Order; // Agregado el modelo Order
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderDetailFactory extends Factory
{
    protected $model = OrderDetail::class;

    public function definition()
    {
        $product = Product::inRandomOrder()->first(); // Obtener un producto aleatorio
        $generatedImage = GeneratedImages::inRandomOrder()->first();
        // Obtener el detalle del producto asociado
        $productDetail = ProductDetail::where('id', $product->id)
            ->inRandomOrder()
            ->first();

        // Calcular el precio total multiplicando el precio unitario por la cantidad
        $totalPrice = $productDetail->price * $this->faker->numberBetween(1, 10);

        // Obtener una orden aleatoria
        $order = Order::inRandomOrder()->first();

        return [
            'idOrder' => $order->id, // Hace referencia a la id de la tabla orders
            'idProduct' => $product->id,
            'idGI' => $generatedImage->idGI, // Asigna el ID del grupo de inventario del producto
            'productName' => $product->name,
            'idVariant' => $productDetail->variant_id, // Asigna el ID de variante del producto
            'quantity' => $this->faker->numberBetween(1, 10), // Cantidad aleatoria entre 1 y 10
            'priceEach' => $productDetail->price, // Precio unitario desde el detalle del producto
            'totalPrice' => $totalPrice, // Precio total calculado
            'shippingPrice' => $this->faker->randomFloat(2, 5, 20), // Precio de envío aleatorio entre 5 y 20
        ];
    }

     /**
     * Indicar valores específicos para las claves foráneas.
     *
     * @param  int  $orderId
     * @param  int  $productId
     * @return \Database\Factories\OrderDetailFactory
     */
    public function forOrderAndProduct($orderId, $productId)
    {
        return $this->state([
            'idOrder' => $orderId,
            'idProduct' => $productId,
        ]);
    }
}
