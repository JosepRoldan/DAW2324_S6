<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Models\Order; 

class FastAPIController extends Controller
{
    public function sendToFastAPI(Request $request)
    {
        $client = new Client();
        $urlBase = config('buyprocess.fastapi.url');

        $orderId = $request->orderId;
        $order = Order::find($orderId);

        // Verificar si se encontró la orden
        if (!$order) {
            return response()->json([
                'success' => false,
                'error' => 'Order not found'
            ]);
        }
        // Intentar obtener el token
        try {
            $tokenResponse = $client->request('POST', $urlBase . '/token', [
                'form_params' => [
                    'username' => config('buyprocess.fastapi.user'),
                    'password' => config('buyprocess.fastapi.password')

                ]
            ]);

            $tokenData = json_decode($tokenResponse->getBody()->getContents(), true);
            $accessToken = $tokenData['access_token'];
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to authenticate: ' . $e->getMessage()
            ]);
        }

        // Datos para enviar a la API
        $data = [
            "external_id" => "",
            "is_test" => true,
            "shipping_method" => "DHL",
            "customs_shipping_costs" => 5.99,
            "shipping" => [
                "email" => "john.doe@example.com",
                "firstname" => $order->name,
                "lastname" => "Doe",
                "company" => "Picanova GmbH",
                "street_primary" => "Hohenzollernring 25",
                "street_secondary" => "Apt 18",
                "city" => "Cologne",
                "postcode" => "50672",
                "country_id" => 276,
                "region_id" => null,
                "telephone" => "+49221669979922"
            ],
            "items" => [
                [
                    "external_id" => null,
                    "quantity" => 1,
                    "variant_code" => "TASSE-LI_QUER-MAGIC",
                    "customs_value" => 10.99,
                    "file" => "https://dummyimage.com/4000x3000/fff/000&text=api.picanova.com",
                    "options" => []
                ]
            ]
        ];

        // Intentar enviar los datos con el token de autenticación
        try {
            $response = $client->request('POST', $urlBase . '/orders', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $accessToken,
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json',
                ],
                'json' => $data
            ]);

            return redirect()->route('processShop.mail');
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to send order: ' . $e->getMessage()
            ]);
        }
    }
}