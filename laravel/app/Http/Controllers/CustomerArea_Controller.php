<?php

namespace App\Http\Controllers;

use App\Models\OrderView;
use Illuminate\Http\Request;
use App\Models\Client; // Asegúrate de importar el modelo de usuario adecuado


class CustomerArea_Controller extends Controller
{
    public function getInitials()
    {
        // Obtener el nombre de usuario (simulado)
        $username = 'Miquel';

        // Buscar al cliente por su nombre de usuario
        $countOrders = OrderView::whereNotIn('orderStatus', ['Canceled', 'Delivered'])->count();

        // Pasar el contador a la vista
        $client = Client::where('username', $username)->first();

        // Verificar si se encontró el cliente
        if ($client) {
            
            // Obtener las iniciales del nombre y apellido del cliente
            $initials = substr($client->name, 0, 1) . substr($client->surname, 0, 1);
            // Pasar las iniciales a la vista
            return view('clientArea', ['client'=> $client,'initials' => $initials, 'countOrders' => $countOrders]);
        } else {
            return 'Cliente no encontrado';
        }
    }
}
