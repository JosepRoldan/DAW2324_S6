<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ViewDetailsModel;
use App\Models\MyOrdersModel;
use App\Models\ProductDetail;
use App\Models\GeneratedImages;
use Illuminate\Support\Facades\Session;



class ViewDetailsController extends Controller
{
    public function getDetailsData()
    {

        $token = Session::get('token');


        $details = MyOrdersModel::join('orderDetails', 'orders.id', '=', 'orderDetails.idOrder')
            ->join('customers', 'customers.id', '=', 'orders.idCustomers')
            ->join('product_details', 'product_details.idProduct', '=', 'orderDetails.idProduct') 
            ->join('generatedImages', 'generatedImages.idGI', '=', 'orderDetails.idGi')
            ->select('orderDetails.*', 'customers.surname', 'customers.name', 'product_details.name', 'generatedImages.prompt', 'orders.datetime', 'orders.orderStatus')
            ->where('customers.username', $token)
            ->get();




        return response()->json($details);
    }
}
