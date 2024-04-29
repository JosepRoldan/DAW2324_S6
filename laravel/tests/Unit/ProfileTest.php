<?php

use App\Http\Controllers\ProfileController;
use App\Models\ProfileModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function testObtenerDatosPerfilUsuario()
    {

        $controlador = new ProfileController();

        // Llamar al método del controlador
        $respuesta = $controlador->getUserProfileData();

        // Afirmaciones
        $this->assertInstanceOf(JsonResponse::class, $respuesta);
        $datosRespuesta = json_decode($respuesta->getContent(), true);
        $this->assertCount(1, $datosRespuesta);
        $this->assertEquals($perfilFalso->toArray(), $datosRespuesta[0]);
    }
}
