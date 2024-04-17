<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;
use App\Models\BuyingProcess;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Customer;
use App\Models\Order;
use App\Models\ShoppingCartItems;
use Illuminate\Http\Response;


class BuyingProcessController extends Controller
{


    public function addAddress(Request $request)
    {
        // Validación de datos
        $rules = [
            'name' => 'required',
            'surname' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'postcode' => 'required',
            'idCountry' => 'required',
        ];
    
        $validator = Validator::make($request->all(), $rules);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        
        Customer::create([
            'name' => $request->input('name'),
            'surname' => $request->input('surname'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'postcode' => $request->input('postcode'),
            'idCountry' => $request->input('idCountry'),
        ]);
    
        return response()->json(['message' => 'Customer created successfully'], 200);
    }

    public function userCartShop()
    {
        $user = Session::get('token');
        $cart = ShoppingCart::find($user);
        return view('processShop.cart', ['cart' => $cart]);
    }


    public function getShoppingOrdreDates()
    {
        // Obtener el nombre de usuario del cliente de la sesión
        $username = Session::get('token');
        // Obtener el cliente actual
        $customer = Customer::where('username', $username)->first();

        // Verificar si se encontró el cliente
        if (!$customer) {
            return view('processShop.guess');
        }

        $address = DB::table('delivery_address')->where('id', $customer->id)->first();
       
        if ($address) {
            // Convertir la dirección de entrega a JSON
            $addressJson = $address->toJson();
        } else {
            // Si la dirección de entrega no existe, establecer el JSON como null
            $addressJson = [];
        }

        // Si existe una orden pendiente, usar los datos de envío de esa orden
        if ($customer) {
            //Si ha encontrado una orden vamos a details
            return view('processShop.shipping', ['customer' => $customer, 'address' => $addressJson,'errorMessage'=>'']);

        } 
    }

}