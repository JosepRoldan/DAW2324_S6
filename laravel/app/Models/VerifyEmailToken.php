<?php

namespace App\Models;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Model;


class VerifyEmailToken extends Model
{
    protected $table = 'email_verify_tokens'; // Nombre de la tabla
    
    protected $fillable = ['mail', 'token', 'created_at', 'expires_at']; // Campos asignables

    public $timestamps = false; // No se crean campos de tiempo en la tabla
    
    public function showVerifyForm(Request $request){
    // Recupera el token de la URL
        $token = $request->token;
        // Busca el token en la base de datos
        $verifyEmailToken = ResetPasswordToken::where('token', $token)->first();
        // Verifica si el token existe y no ha expirado
        if ($verifyEmailToken && Carbon::now()->lt($verifyEmailToken->expires_at)) {
            // El token es válido y no ha expirado, muestra la vista de restablecento de contraseña
            $email = $verifyEmailToken->mail;
            Customer::where('mail', $email)->update(['customerStatus' => $request->input('Active')]);
            $verifyEmailToken->delete();
            return view('login', ['token' => $token]);
        } else {
            // El token no es válido o ha expirado, redirige o muestra un mensaje de error
            return redirect()->route('error.verify')->with('error', 'El token de verificación no es válido o ha expirado.');
        }
    }


}

