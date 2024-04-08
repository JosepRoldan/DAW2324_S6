<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\MostrarImagenesController;
use Illuminate\Http\Request;

class MostrarImagenesControllerTest extends TestCase
{
    public function testEnviarPrompt()
    {
        $controller = new MostrarImagenesController();
        $request = new Request([
            'prompt' => 'Ejemplo de prompt',
            'user' => 'Miquel',
        ]);

        $response = $controller->enviarPrompt($request);
        
        // Verifica si la respuesta es un array
        $this->assertIsArray($response);

        // Verifica si el array tiene una longitud específica (por ejemplo, 3 elementos)
        $this->assertCount(3, $response); // Cambia el número 3 según sea necesario

    }

    public function testModiPrompt()
    {
        // Similar a testEnviarPrompt, pero para modiPrompt
    }

    public function testGuardarImatge()
    {
        // Similar a testEnviarPrompt, pero para guardarImatge
    }

    public function testSaveImg()
    {
        // Similar a testEnviarPrompt, pero para saveImg
    }
}
