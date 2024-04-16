<?php

namespace App\Http\Controllers;

use App\Models\OrderView;
use App\Models\Order;
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

    public function saveCartShippingData(Request $request)
    {
        // Validación de datos
        $rules = [
            'idCustomers' => 'required',
            'name' => 'required',
            'surname' => 'required',
            'address' => 'required',
            'postcode' => 'required',
            'country' => 'required',
            'state' => 'required',
            'city'=>'required',
        ];
    
        $validator = Validator::make($request->all(), $rules);
    
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    
        // Crear un nuevo pedido con los datos proporcionados
        $order = new Order();
        $order->idCustomers = $request->input('idCustomers');
        $order->datetime = now();
        $order->name = $request->input('name');
        $order->surname = $request->input('surname');
        $order->address = $request->input('address');
        $order->postcode = $request->input('postcode');
        $order->country = $request->input('country');
        $order->state = $request->input('state');
        $order->city = $request->input('city');
        $order->orderStatus = 'Pending';
        $order->save();
    
        // Aquí debes incluir la lógica para guardar los detalles del pedido
    
        // Redireccionar a una página de confirmación u otra página según tu flujo de la aplicación
        return redirect()->route('details')->with('success', 'Order placed successfully!');
    }

    public function updateCartShippingData(Request $request)
    {
        // Validación de datos
        $rules = [
            'idCustomers' => 'required',
            'name' => 'required',
            'surname' => 'required',
            'address' => 'required',
            'postcode' => 'required',
            'country' => 'required',
            'state' => 'required',
            'city' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Obtener el ID del cliente desde el formulario
        $customerId = $request->input('idCustomers');

        // Buscar la orden del cliente en la base de datos
        $order = Order::where('idCustomers', $customerId)->first();

        // Verificar si la orden existe
        if (!$order) {
            return redirect()->back()->withErrors(['message' => 'Order not found.'])->withInput();
        }

        // Actualizar los datos de envío de la orden
        $order->name = $request->input('name');
        $order->surname = $request->input('surname');
        $order->address = $request->input('address');
        $order->postcode = $request->input('postcode');
        $order->country = $request->input('country');
        $order->state = $request->input('state');
        $order->city = $request->input('city');
        $order->save();

        // Redireccionar a una página de confirmación o a donde desees
        return redirect()->route('details')->with('message', 'Shipping information updated successfully!');
    }

}
