<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MyOrdersModel;
use App\Models\ProfileModel;
use Illuminate\Support\Facades\Session;


class MyOrdersController extends Controller
{
    public function getUserOrders()
    {
        $token = Session::get('token');

        $orders = MyOrdersModel::join('customers', 'orders.idCustomers', '=', 'customers.id')
            ->select('orders.*', 'customers.name', 'customers.surname', 'customers.mail', 'customers.username')
            ->where('customers.username', $token)
            ->get();

        return response()->json($orders);
    }
}