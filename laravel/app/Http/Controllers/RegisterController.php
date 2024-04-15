<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use App\Models\Registro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Session;

class RegisterController extends Controller
{
    public function index()
    {
        $registro = new Registro();
        $customers = $registro->getAllClients();
        return view('index', ['customers' => $customers]);
    }
    public function store(Request $request)
    {

        $rules = [
            'username' => 'required|unique:customers',
            'password' => 'required|min:8',
            'mail' => 'required|email|unique:customers',
        ];

        $validator = Validator::make($request->all(), $rules);
        $errors = $validator->errors();
        // $isMissingField = $errors->has('username') || $errors->has('password') || $errors->has('mail');

        

        if (
            $validator->fails() && ($errors->has('username') || $errors->has('mail'))
        ) {
            return response()->json(null, 401);
        }
        elseif (
            ($request->has(!'username') || $request->has(!'mail') || $request->has(!'password'))
        ) {
            return response()->json(null, 400);
        }elseif ($validator->fails() || strlen($request->input('password')) < 8) {
            return response()->json(null, 411);
        }


        $data = [
            'username' => $request->input('username'),
            'mail' => $request->input('mail'),
            'password' => Hash::make($request->input('password')), // Hashear la contraseña usando bcrypt
            'membershipDate' => now(), // Utiliza la función now() para obtener la fecha y hora actual
        ];

        $registro = new Registro();
        $registro->addClient($data);
        $token = $data['username'];
        Session::put('token', $token);

        // Redirige a una página de confirmación o a donde sea apropiado
        return redirect()->to('Inicio');
    }

    public function login(Request $request){
        $email = $request->input('mail');
        $password = $request->input('password');
        $user = DB::table('customers')->where('mail', $email)->first();
        if ($user) {
            // Verificar la contraseña
            if (Hash::check($password, $user->password)) {
                $token = $user->username;
                Session::put('token', $token);
                return response()->json(['token' => $token], 200);
            }else {
                // La contraseña no coincide, autenticación fallida
                return response()->json(['message' => 'Credenciales inválidas'], 401);
            }
        } else {
            // No se encontró ningún usuario con el correo electrónico proporcionado
            return response()->json(['message' => 'Usuario o contraseña incorrecta'], 404);
        }
    }
    public function logout()
    {
        // Eliminar la variable de sesión 'token'
        Session::forget('token');

        // Redirigir a la página de inicio o a donde desees
        return redirect('/Inicio');
    }
}
