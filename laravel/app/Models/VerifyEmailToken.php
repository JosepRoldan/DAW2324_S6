<?php

namespace App\Models;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;


class VerifyEmailToken extends Model
{
    protected $table = 'password_reset_tokens'; // Nombre de la tabla
    
    protected $fillable = ['mail', 'token', 'created_at', 'expires_at']; // Campos asignables

    public $timestamps = false; // No se crean campos de tiempo en la tabla
    
    public function showResetForm(Request $request){
    // Recupera el token de la URL
        $token = $request->token;
        // Busca el token en la base de datos
        $passwordResetToken = ResetPasswordToken::where('token', $token)->first();
        // Verifica si el token existe y no ha expirado
        if ($passwordResetToken && Carbon::now()->lt($passwordResetToken->expires_at)) {
            // El token es válido y no ha expirado, muestra la vista de restablecento de contraseña
            $email = $passwordResetToken->mail;
            Customer::where('mail', $email)->update([
                //Esto es para cambiar la contraseña, y hashearla en la base de datos, sabe que dato hashear por el input del formulario.
                'password' => Hash::make($request->input('nueva_contraseña'))
            ]);
            $passwordResetToken->delete();
            return view('auth.passwords.reset', ['token' => $token]);
        } else {
            // El token no es válido o ha expirado, redirige o muestra un mensaje de error
            return redirect()->route('error.route')->with('error', 'El token de restablecimiento de contraseña no es válido o ha expirado.');
        }
    }


}

