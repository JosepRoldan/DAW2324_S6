<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MyImagesModel;


class MyImagesController extends Controller
{
    public function getUserSavedImages()
    {
        $id = 1;
        $imagenes = MyImagesModel::where('idCustomers', $id)->where('is_saved', true)->get();
        return response()->json($imagenes);
    }
}
