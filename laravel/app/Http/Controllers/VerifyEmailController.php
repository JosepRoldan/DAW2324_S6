<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Registro;
use SendGrid\Mail\Mail;
use SendGrid;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\VerifyEmailToken;


class VerifyEmailController extends Controller
{
    public function sendVerifyLinkEmail(Request $request){
        $request->validate([
            'email' => 'required|email|',
        ]);

        /*Creo un token de seguridad que envio por correo electrónico al usuario que pide un cambio de contraseña,
        este token lo almaceno en la base de datos para identificar al usuario ya que lo recupero de la URL en 
        la view del cambio de contraseña, le añado una vida de 20 minutos*/

        $token = Str::random(60); // Utiliza Str::random() para generar una cadena aleatoria segura
        $createdAt = now();
        $expiresAt = now()->addMinutes(120);
        VerifyEmailToken::create([
            'mail' => $request->email,
            'token' => $token,
            'created_at' => $createdAt,
            'expires_at' => $expiresAt,
        ]);

        // Genera el enlace para restablecer la contraseña
        $resetLink = url('/auth/verify/'.$token);

        // Busca al usuario por su correo electrónico
        $registro = new Registro();
        $user = $registro->where('mail', $request->email)->first();
        dd($registro);
        // Envía el correo electrónico con el enlace para restablecer la contraseña
        $email = new Mail();
        $email->setFrom("josemedina@iesmontsia.org", "Aladdin Powell");
        $email->setSubject("Verificación de email CustomAIze");
        $email->addTo($user->mail, "Nombre del Destinatario");
        $email->addContent("text/plain", "Hemos recibido una solicitud de verificación. Haz clic en el siguiente enlace para verificar tu correo electrónico: $resetLink , en caso de que no hayas solicitado una verificación, cambia tu contraseña.");

        // Configuración de SendGrid
        $apiKey = config('configuration.SENDGRID_API_KEY');
        $sendgrid = new SendGrid($apiKey);
        try {
            $response = $sendgrid->send($email);
            return back()->with('success', 'Se ha enviado un correo electrónico con las instrucciones para verificar tu correo electrónico.');
        } catch (\Exception $e) {
            return back()->with('error', 'Error al enviar el correo electrónico: ' . $e->getMessage());
        }
        // Retorna a la vista anterior con un mensaje de éxito
    }
}
