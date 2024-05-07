<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Registro;
use SendGrid\Mail\Mail;
use SendGrid;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\VerifyEmailToken;
use App\Models\Customer;



class VerifyEmailController extends Controller
{
    public function sendVerificationEmailAfterRegister($userEmail)
    {    
        // Genera el token de verificación
        $verificationToken = Str::random(60);
    
           // Guarda el token de verificación en la tabla email_verify_tokens
        $now = Carbon::now();
        $expiresAt = $now->copy()->addMinutes(120);
        VerifyEmailToken::create([
            'mail' => $userEmail,
            'token' => $verificationToken,
            'created_at' => $now,
            'expires_at' => $expiresAt,
        ]);
    
        // Genera el enlace de verificación
        $verificationLink = route('confirm.email', ['token' => $verificationToken]);
    
        // Crea el correo electrónico de verificación
        $email = new Mail();
        $email->setFrom("josemedina@iesmontsia.org", "Tu Nombre");
        $email->setSubject("Verificación de Correo Electrónico");
        $email->addTo($userEmail);
        $email->addContent("text/plain", "Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico: $verificationLink");
    
        // Envía el correo electrónico de verificación
        $apiKey = config('configuration.SENDGRID_API_KEY');
        $sendgrid = new SendGrid($apiKey);
        try {
            $response = $sendgrid->send($email);
            // Manejar respuesta (opcional)
        } catch (\Exception $e) {
            // Manejar errores
        }
    
        return back()->with('success', 'Se ha enviado un correo electrónico de verificación.');
    }
    public function confirmEmail(Request $request)
{
    // Obtener el token de la URL
    $token = $request->query('token');

    // Buscar el registro en la tabla email_verify_tokens
    $verificationToken = VerifyEmailToken::where('token', $token)->first();

    // Verificar si se encontró el token y si no ha expirado
    if ($verificationToken && Carbon::now()->lt($verificationToken->expires_at)) {
        // El token es válido y no ha expirado, realizar la acción de confirmación de correo electrónico
        $email = $verificationToken->mail;

        // Actualizar el estado de confirmación de correo electrónico en la tabla customers o realizar cualquier otra acción necesaria
        $user = Customer::where('mail', $email)->first();
        $user->update(['is_validated' => true]); // Suponiendo que tienes un campo 'is_validated' en tu tabla customers para indicar si el correo electrónico ha sido validado
        $user->update(['customerStatus' => 'Active']); 

        // Eliminar el registro de token de verificación de la base de datos
        $verificationToken->delete();

        // Redirigir a una página de confirmación exitosa
        return view('verificacion-correcta');
    } else {
        // El token no es válido, ha expirado o ya se ha utilizado, redirigir o mostrar un mensaje de error
        return view('verificacion-incorrecta');
    }
}
    
}
