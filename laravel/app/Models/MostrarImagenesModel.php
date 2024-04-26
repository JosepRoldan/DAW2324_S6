<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use GuzzleHttp\Exception\RequestException;





class MostrarImagenesModel extends Model
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'http://fastapi:8003', // URL base de la API externa
            'timeout'  => 15, // Tiempo de espera en segundos
        ]);
    }

    public function enviarPrompt($inputValue)
    {
    try {
        $response = $this->client->post('/generateImages', [
            'headers' => [
                'Content-Type' => 'application/json',
                'X-API-Key' => 'my_api_key',
            ],
            'json' => [
                'prompt' => $inputValue,
            ],
        ]);
        
        return json_decode($response->getBody()->getContents(),true);

    } catch (\Exception $e) {
        // Manejar la excepción adecuadamente y devolver un objeto de respuesta consistente
        return ['error del modelo generate' => $e->getMessage()];
    }
    }

    public function modifPrompt($url,$user,$id)
    {
    try {
        
        $response = $this->client->post('/editarImage', [
            'headers' => [
                'Content-Type' => 'application/json',
                'X-API-Key' => 'my_api_key',
            ],
            'json' => [
                'url' => $url,
                'nombre_usuari' => $user,
                'idImg' => $id,
            ],
        ]);
        
        return json_decode($response->getBody()->getContents(),true);
    } catch (\Exception $e) {
        // Manejar la excepción adecuadamente y devolver un objeto de respuesta consistente
        return ['error del modelo mod' => $e->getMessage()];
    }
    }

    public function guardarImatge($data)
    {
        $idInsertado = DB::table('generatedImages')->insertGetId($data);
        return $idInsertado;
    
    }

    public function storeImg($idImg,$userId,$imgUrl)
    {
        $registro = DB::table('generatedImages')->where('idGI', $idImg)->where('idCustomers', $userId)->first();
        
        if($registro){
            $imageData = $this->client->request('GET', $imgUrl);
            if ($imageData->getStatusCode() == 200) {
                Storage::disk('stored_img')->put($idImg.".jpg", $imageData->getBody()->getContents());
                DB::table('generatedImages')
                ->where('idGI', $idImg)
                ->update(['is_saved' => true]);
                return $registro;
            }else{
                throw new \Exception("Error al guardar la imagen en la carpeta local");
            }
            }else{
                throw new \Exception("No se encontró el registro de imagen correspondiente");
            }
    }
}
