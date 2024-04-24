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


        $details = MyOrdersModel::join('orders_details', 'orders.id', '=', 'orders_details.idOrder')
            ->join('customers', 'customers.id', '=', 'orders.idCustomers')
            ->join('product_details', 'product_details.idProduct', '=', 'orders_details.idProduct') 
            ->join('generatedImages', 'generatedImages.idGI', '=', 'orders_details.idGi')
            ->select('orders_details.*', 'customers.surname', 'customers.name as name', 'product_details.name as variant', 'generatedImages.prompt', 'orders.datetime', 'orders.orderStatus')
            ->where('customers.username', $token)
            ->get();

        return response()->json($details);
    }
}
