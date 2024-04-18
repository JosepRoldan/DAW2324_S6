<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetails;

class OrderDetailsController extends Controller
{
    public function index()
    {
        $orders = OrderDetails::all();

        return response()->json($orders);
    }
    
public function show($id)
    {
        // Utiliza where() en lugar de find()
        $orderDetails = OrderDetails::where('idOrder', $id)->get();

        if ($orderDetails->count() > 0) {
            return response()->json($orderDetails);
        } else {
            return response()->json(['message' => 'Order details not found for order ID: ' . $id], 404);
        }
    }
}
