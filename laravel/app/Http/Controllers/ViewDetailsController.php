<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ViewDetailsModel;
use App\Models\MyOrdersModel;
use App\Models\ProfileModel;
use App\Models\ProductDetails;



class ViewDetailsController extends Controller
{
    public function getDetailsData()
    {

        $userId=1;

        $details = MyOrdersModel::join('orderDetails', 'orders.id', '=', 'orderDetails.idOrder')
            ->join('customers', 'customers.idCustomers', '=', 'orders.idCustomers')
            ->select('orderDetails.*', 'orders.datetime', 'orders.orderStatus', 'customers.name', 'customers.surname','customers.address')
            ->where('customers.idCustomers', $userId)
            ->get();

        return response()->json($details);
    }
}
