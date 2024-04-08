<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MyOrdersModel;
use App\Models\ProfileModel;


class MyOrdersController extends Controller
{
    public function getUserOrders()
    {
        $userId = 1;

        $orders = MyOrdersModel::join('customers', 'orders.idCustomers', '=', 'customers.idCustomers')
            ->select('orders.*', 'customers.name', 'customers.surname', 'customers.mail')
            ->where('orders.idCustomers', $userId)
            ->get();

        return response()->json($orders);
    }
}