<?php

namespace App\Http\Controllers;

use App\Models\AddressDelivery;
use App\Models\OrderView;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\DeliveryAddress;

use App\Models\Customer;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class OrdersController extends Controller
{
    public function OrdersTable()
    {
        // Obtener los datos de la vista de pedidos
        $orders = OrderView::all();

        // Pasar los datos a la vista
        return view('MyOrders', compact('orders'));
    }

    public function storeDates(Request $request)
    {
        $requestData = $request->validate([
            'customer'=>'required|array',
            'customer.name' => 'required|string',
            'customer.surname' => 'required|string',
            'customer.mail'=> 'required|string',

            'address' => 'required|array',
            'address.address' => 'required|string',
            'address.city' => 'required|string',
            'address.postcode' => 'required|string',
            'address.state' => 'required|string',
            'address.country' => 'required|string',

            'products' => 'required|array',
            // Agrega más validaciones según tus necesidades
        ]);

        $customerData = $requestData['customer'];
        $addressData = $requestData['address'];
        $productsData = $requestData['products'];

        // Verifica si el cliente ya existe en la base de datos
        $customer = Customer::where('mail', $customerData['mail'])->first();

        // Si el cliente no existe, crea uno nuevo
        if (!$customer) {
            return redirect()->route('login')->with('error', 'Please login to place your order.');
        } else {
            // Si el cliente ya existe, actualiza los datos
            $customer->update($customerData);
        }

        // Guarda o actualiza la dirección de envío
        $deliveryAddress = AddressDelivery::updateOrCreate(
            ['idCustomers' => $customer->id],
            $addressData
        );

        // Crea una nueva orden
        $order = Order::create([
            'idCustomers' => $customer->id,
            'name' => $customer->name,
            'address' => $deliveryAddress->address,
            'totalPrice' => $this->calculateTotalPrice($productsData),
            'datetime' => now(),
        ]);

        // Guarda los detalles de la orden
        foreach ($productsData as $product) {
            OrderDetail::create([
                'idOrder' => $order->id,
                'idProduct' => $product['id'],
                'productName' => $product['name'],
                'quantity' => $product['quantity'],
                'priceEach' => $product['price'],
                'totalPrice' => $product['totalPrice'],
                // Puedes manejar el precio de envío aquí si es necesario
            ]);
        }

        return response()->json(['message' => 'Order data saved successfully']);
    }

    // Método auxiliar para calcular el precio total de los productos
    private function calculateTotalPrice($products)
    {
        return collect($products)->sum(function ($product) {
            return $product['price'] * $product['quantity'];
        });
    }
    
}
