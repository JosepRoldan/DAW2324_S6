<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class LoginController extends Controller
{
    public function register(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|string|email|unique:users|max:255',
            'user' => 'required|string|max:50|unique:users',
            'password' => 'required|string|min:6|max:200',
        ]);

        // Crear un nuevo usuario
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'user' => $request->input('user'), // Asegúrate de incluir el campo 'user'
            'password' => Hash::make($request->input('password')),
        ]);

        // Autenticar al usuario recién creado
        Auth::login($user);

        // Retornar una respuesta
        return response()->json(['message' => 'Registration successful'], 201);
    }

    public function login(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return response()->json(['message' => 'Login successful'], 200);
        } else {
            return response()->json(['message' => 'Login failed'], 401);
        }
    }


    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out'], 201);
    }
}
