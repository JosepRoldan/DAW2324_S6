<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Customer;
use App\Models\Order;
use SendGrid\Mail\Mail;
use SendGrid;

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
            $totalAmount = $request['totalAmount'];
            $orderId = $request['orderId'];
            return view('processShop.payment',['totalAmount'=>$totalAmount,'orderId'=>$orderId]);
      
    }

    public function success(Request $request)
    {
        // Obtener el orderId de la solicitud
        $orderId = $request->orderId;

        // Buscar la orden en la base de datos por su orderId
        $order = Order::find($orderId);

        // Verificar si se encontró la orden
        if ($order) {
            // Actualizar el estado de la orden a "inProgress"
            $order->orderStatus = 'InProgress';
            $order->save();
            $this->sendMailConfirm();

            // Opcional: puedes devolver una respuesta JSON u otra respuesta según tus necesidades
            return response()->json(['message' => 'Order status updated successfully'], 200);
        } else {
            // Si la orden no se encuentra, puedes devolver un mensaje de error
            return response()->json(['error' => 'Order not found'], 404);
        }
    }

    public function cancel (Request $request) {
{
    // Aquí puedes realizar cualquier acción que desees cuando una transacción sea cancelada por el usuario
    // Por ejemplo, puedes redirigir al usuario a una página específica, mostrar un mensaje de cancelación, etc.

    // Por ahora, simplemente redirigiremos al usuario a una página de cancelación
    //return redirect()->route('Carrito');
}
    }

    public function sendMailConfirm() {
        $email = new Mail();
        $email->setFrom("josemedina@iesmontsia.org", "Aladdin Powell");
        $email->setSubject("Cambio de contraseña CustomAIze");
        $email->addTo('paulacruzado@iesmontsia.org', "Nombre del Destinatario");
        $email->addContent("text/plain", "Gracias por su compra.");

        // Configuración de SendGrid
        $apiKey = env('SENDGRID_API_KEY');
        $sendgrid = new SendGrid($apiKey);
        try {
            $response = $sendgrid->send($email);
            return response()->json(['message' => 'Order status updated successfully'], 200);
        } catch (\Exception $e) {
            return back()->with('error', 'Error al enviar el correo electrónico: ' . $e->getMessage());
        }
    }
    
}