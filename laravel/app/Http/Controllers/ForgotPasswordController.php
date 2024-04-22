<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Registro;
use SendGrid\Mail\Mail;
use SendGrid;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\ResetPasswordToken;


class ForgotPasswordController extends Controller
{
    public function showForgotPasswordForm()
    {
        return view('auth.forgot-password');
    }

    public function sendResetLinkEmail(Request $request){
        $request->validate([
            'email' => 'required|email|exists:customers,mail',
        ]);

        /*Creo un token de seguridad que envio por correo electrónico al usuario que pide un cambio de contraseña,
        este token lo almaceno en la base de datos para identificar al usuario ya que lo recupero de la URL en 
        la view del cambio de contraseña, le añado una vida de 20 minutos*/

        $token = Str::random(60); // Utiliza Str::random() para generar una cadena aleatoria segura
        $createdAt = now();
        $expiresAt = now()->addMinutes(120);
        ResetPasswordToken::create([
            'mail' => $request->email,
            'token' => $token,
            'created_at' => $createdAt,
            'expires_at' => $expiresAt,
        ]);

        // Genera el enlace para restablecer la contraseña
        $resetLink = url('/passwords/reset/'.$token);

        // Busca al usuario por su correo electrónico
        $registro = new Registro();
        $user = $registro->where('mail', $request->email)->first();

        // Envía el correo electrónico con el enlace para restablecer la contraseña
        $email = new Mail();
        $email->setFrom("josemedina@iesmontsia.org", "Aladdin Powell");
        $email->setSubject("Cambio de contraseña CustomAIze");
        $email->addTo($user->mail, "Nombre del Destinatario");
        $email->addContent("text/plain", "Ha solicitado un restablecimiento de contraseña. Haz clic en el siguiente enlace para cambiar tu contraseña: $resetLink , en caso de que no has solicitado un restablecimiento de contraseña, puedes ignorar este correo electrónico.");
        // Configuración de SendGrid
        $apiKey = env('SENDGRID_API_KEY');
        $sendgrid = new SendGrid($apiKey);
        try {
            $response = $sendgrid->send($email);
            return back()->with('success', 'Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña.');
        } catch (\Exception $e) {
            return back()->with('error', 'Error al enviar el correo electrónico: ' . $e->getMessage());
        }
        // Retorna a la vista anterior con un mensaje de éxito
    }
    public function showResetForm(Request $request)
    {
        return view('auth.passwords.reset')->with(
            ['token' => $request->token, 'email' => $request->email]
        );
    }
    public function reset(Request $request)
    {
        // Obtener el token de la URL
        $token = $request->query('token');

        // Buscar el token en la base de datos
        $passwordReset = ResetPasswordToken::where('token', $token)
                            ->where('created_at', '>=', Carbon::now()->subMinutes(20)) // Validar que el token no haya expirado (20 minutos)
                            ->first();

        if (!$passwordReset) {
            // El token no es válido o ha expirado
            return redirect()->route('password.reset.invalid');
        }

        // Si el token es válido, obtén el correo electrónico asociado
        $email = $passwordReset->mail;

        // Ahora puedes usar el correo electrónico como desees
        // Por ejemplo, pasarlo a una vista o realizar alguna acción con él

        return view('password.reset', ['token' => $token, 'email' => $email]);
    }
}


