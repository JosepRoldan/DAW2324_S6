<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetails;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();

        return response()->json($orders);
    }

    /////////Metodo para añadir nuevo pedido.
    // public function agregarPedido($idOrderPicanova, $idCustomer, $datetime, $orderStatus)
    // {
    // $pedido = new Order([
    //     'idOrderPicanova' => $idOrderPicanova,
    //     'idCustomer'      => $idCustomer,
    //     'datetime'        => $datetime,
    //     'orderStatus'     => $orderStatus,
    // ]);

    // $pedido->save();

    // return $pedido;
    // }

    ////////Metodo para cancelar pedido.
    // public function cancelarPedido($idPedido)
    // {
    //     $pedido = Order::find($idPedido);

    //     if (!$pedido) {
    //         // Manejar el caso en que el pedido no se encuentre
    //         return response()->json(['mensaje' => 'Pedido no encontrado'], 404);
    //     }

    //     // Cancelar el pedido (puedes ajustar el estado según tus necesidades)
    //     $pedido->update(['orderStatus' => 'cancelado']);

    //     return response()->json(['mensaje' => 'Pedido cancelado exitosamente']);
    // }
}