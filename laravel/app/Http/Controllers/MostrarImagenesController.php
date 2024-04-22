<?php

namespace App\Http\Controllers;

use App\Models\MostrarImagenesModel;
use App\Models\Registro;
use Illuminate\Http\Request;


class MostrarImagenesController extends Controller
{
        public function enviarPrompt(Request $request)
    {
        // Obtener el valor de 'prompt' del cuerpo de la solicitud
        $prompt = $request->input('prompt'); 
        // Obtener el valor de 'user' del cuerpo de la solicitud
        $user = $request->input('user');
        $enviarCommunication = new MostrarImagenesModel();
        $solicitarCliente = new Registro();

        $idUser = $solicitarCliente->solicitarId($user);
        $response = $enviarCommunication->enviarPrompt($prompt);
        
        $data = [
            'idCustomers' => $idUser,
            'prompt' => $prompt,
            'path' => getenv('PATH_GENERATED_IMAGES'), 
            'cost' => "0.7",
            'is_saved' => false,    
        ];
        
        $datosImagenes = array();

        foreach ($response as $url) {
            $id = $this->guardarImatge($data);
            $datosImagenes[] = array(
                'id' => $id,
                'url' => $url
            );

        }

        return $datosImagenes;
    }

    public function modiPrompt(Request $request)
    {
        $urlValue = $request->input('url'); 
        $userValue = $request->input('user');
        $idImgValue = $request->input('idImg');
        $promptValue = $request->input('prompt');
        
        $modCommunication = new MostrarImagenesModel();
        $solicitarCliente = new Registro();
        $idUser = $solicitarCliente->solicitarId($userValue);
        $response = $modCommunication->modifPrompt($urlValue,$userValue,$idImgValue);

        $data = [
            'idCustomers' => $idUser,
            'prompt' => $promptValue,
            'path' => getenv('PATH_GENERATED_IMAGES'), 
            'cost' => "0.7",
            'is_saved' => false,    
        ];

        $datosImagenes = array();

        foreach ($response as $url) {
            $id = $this->guardarImatge($data);
            $datosImagenes[] = array(
                'id' => $id,
                'url' => $url
            );

        }

        return $datosImagenes;
    }

    public function guardarImatge($data)
    {
        $guardantImatge = new MostrarImagenesModel();
        return $guardantImatge->guardarImatge($data);

    }

    public function saveImg(Request $request)
{
    try {
        
        $idImg = $request->input('idImg'); 
        $username = $request->input('user');
        $imgUrl = $request->input('imgUrl');
        $solicitarCliente = new Registro();
        $guardantImatge2 = new MostrarImagenesModel();
        $idUser = $solicitarCliente->solicitarId($username);
        $guardada = $guardantImatge2->storeImg($idImg, $idUser, $imgUrl);
        if ($guardada) {
            return $guardada;
        }
    } catch (\Exception $e) {
        // Manejar el error aquí, devolver un mensaje de error
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

}
