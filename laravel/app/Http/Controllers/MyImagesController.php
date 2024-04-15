<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MyImagesModel;
use App\Models\ProfileModel;
use Illuminate\Support\Facades\Session;


class MyImagesController extends Controller
{
    public function getUserSavedImages()
    {
        $token = Session::get('token');

        $imagenes = MyImagesModel::join('customers', 'generatedImages.idCustomers', '=', 'customers.idCustomers')
                    ->select('generatedImages.*', 'customers.*')
                    ->where('customers.username', $token)
                    ->where('generatedImages.is_saved', true)
                    ->get();
        
        return response()->json($imagenes);
    }
}