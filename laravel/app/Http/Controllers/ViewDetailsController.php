<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ViewDetailsModel;
use App\Models\MyOrdersModel;
use App\Models\ProfileModel;
use App\Models\ProductDetails;
use Illuminate\Support\Facades\Session;



class ViewDetailsController extends Controller
{
    public function getDetailsData()
    {

        $token = Session::get('token');

        $details = MyOrdersModel::join('orderDetails', 'orders.id', '=', 'orderDetails.idOrder')
            ->join('customers', 'customers.idCustomers', '=', 'orders.idCustomers')
            ->select('orderDetails.*', 'orders.datetime', 'orders.orderStatus','customers.username', 'customers.name', 'customers.surname','customers.address')
            ->where('customers.idCustomers', $token)
            ->get();

        return response()->json($details);
    }
}
