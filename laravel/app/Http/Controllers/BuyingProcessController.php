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

    public function getCartItems($cartId)
    {
        // Obtener todos los elementos del carrito
        $cartItems = ShoppingCartItems::where('idCart', $cartId)->with('product')->get();

        // Inicializar un array para almacenar los detalles de los productos
        $productsData = [];

        // Recorrer cada elemento del carrito para obtener los detalles de los productos
        foreach ($cartItems as $item) {
            // Acceder a los detalles del producto directamente desde la relación
            $productData = $item->product;

            // Agregar los detalles del producto al array
            $productsData[] = $productData;
        }

        // Devolver solo los datos de los productos sin incluir los encabezados de la respuesta
        return $productsData;
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

        $address = DB::table('delivery_address')->where('idCustomers', $customer->idCustomers)->first();
       
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

        } else {
            $customer = Customer::where('username', $username)->first();
            if ($customer) {
                return view('processShop.shipping', ['customer' => $customer, 'address' => $address,'errorMessage'=>'']);
            } else {
                return view('processShop.shipping', ['customer' => $customer, 'address' => $address, 'errorMessage'=>'']);
            }
        }
    }

    public function detailsDates()
    {
        // Obtener el nombre de usuario del cliente de la sesión
        $username = Session::get('token');
    
        // Obtener el cliente actual
        $customer = Customer::where('username', $username)->first();
    
        // Verificar si se encontró el cliente
        if (!$customer) {
            return view('processShop.guess', ['errorMessage' => "You aren't login"]);
        }
    
        // Obtener el carrito de compras del cliente
        $shoppingCart = ShoppingCart::where('idCustomers', $customer->idCustomers)->first();
        
        // Verificar si el cliente tiene un carrito de compras
        if (!$shoppingCart) {
            return view('processShop.shipping', ['customer' => $customer, 'errorMessage' => 'You have no cart at the moment']);
        }
    
        // Verificar si existe una orden pendiente para este cliente
        $customer = Order::where('idCustomers', $customer->idCustomers)
                              ->where('orderStatus', 'Pending')
                              ->first();
    
        // Si existe una orden pendiente, usar los datos de envío de esa orden
        if ($customer) {
            //$products = $shoppingCart->items();
            $products = $this->getCartItems($shoppingCart->id);

            //Si ha encontrado una orden vamos a details
            return view('processShop.details', ['customer' => $customer, 'carrito' => $shoppingCart, 'products' => $products,'errorMessage'=>'']);
        } else {
            $customer = Customer::where('username', $username)->first();
            if ($customer) {
                return view('processShop.shipping', ['customer' => $customer, 'carrito' => $shoppingCart,'errorMessage'=>'']);
            } else {
                return view('processShop.shipping', ['customer' => $customer, 'carrito' => $shoppingCart, 'errorMessage'=>'']);
            }
        }
    }

    public function paymentDates()
    {
        // Obtener el nombre de usuario del cliente de la sesión
        $username = Session::get('token');
    
        // Obtener el cliente actual
        $customer = Customer::where('username', $username)->first();
    
        // Verificar si se encontró el cliente
        if (!$customer) {
            return view('processShop.shipping', ['errorMessage' => "You aren't login"]);
        }
    
        // Obtener el carrito de compras del cliente
        $shoppingCart = ShoppingCart::where('idCustomers', $customer->idCustomers)->first();
        
        // Verificar si el cliente tiene un carrito de compras
        if (!$shoppingCart) {
            return view('processShop.shipping', ['customer' => $customer, 'errorMessage' => 'You have no cart at the moment']);
        }
        return view('processShop.paymentMethod', ['carrito' => $shoppingCart,'errorMessage'=>'']);

    }


}