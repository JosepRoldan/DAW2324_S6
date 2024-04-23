<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Customer;
use Srmklive\PayPal\Services\PayPal as PayPalClient; //per usar paypal
use Illuminate\Http\Response;


class BuyingProcessController extends Controller
{


    public function addAddress(Request $request)
    {
        // Validación de datos
        $rules = [
            'name' => 'required',
            'surname' => 'required',
            'city' => 'required',
            'address' => 'required',
            'postcode' => 'required',
            'country' => 'required',
        ];
    
        $validator = Validator::make($request->all(), $rules);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        
        Customer::create([
            'name' => $request->input('name'),
            'surname' => $request->input('surname'),
            'city' => $request->input('city'),
            'address' => $request->input('address'),
            'postcode' => $request->input('postcode'),
            'Country' => $request->input('country'),
        ]);
    
        return response()->json(['message' => 'Customer created successfully'], 200);
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
    
        // Obtener la dirección de entrega si existe
        $address = $customer->getAddressDelivery;
    
        // Definir un valor por defecto para la dirección si es nula
        if (!$address) {
            $address = [];
        }
    
        // Si existe una orden pendiente, usar los datos de envío de esa orden
        if ($customer) {
            //Si ha encontrado una orden vamos a details
            return view('processShop.shipping', ['customer' => $customer, 'address' => $address,'errorMessage'=>'']);
        } 
    }

    public function paypal(Request $request){
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $response = $provider->createOrder([
            "intent"=> "CAPTURE",
            "aplicationtion_context" => [
                "return_url" => route('processShop.success'),
                "cancel_url" => route('processShop.cancel'),
            ],
            "purchase_units"=> [
              [
                "amount"=> [
                    "currency_code"=> "USD",
                    "value"=> $request->totalAmount
                ]
              ]
            ]
        ]);
        if (isset($response['id']) && $response['id']!= null ) {
            foreach ($response['links'] as $link) {
                if ($link['rel'] === 'approve') {
                    return redirect()->away($link['href']);
                }
            }

        }
    }
    
}