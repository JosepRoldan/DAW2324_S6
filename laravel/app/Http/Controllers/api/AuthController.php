<?php

namespace App\Http\Controllers\api;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    /**
     * This PHP code defines a login method that takes a LoginRequest object as input. It validates the request data, 
     * checks if the user exists and the password is correct, and then generates and returns a token along with the user information 
     * in JSON format.
     */
    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        $user = User::where('user', $data['user'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                //en caso de que no sea correcto devuelve mensaje
                'message' => 'username or password is incorrect!'
            ], 401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;

        // $cookie = cookie('token', $token, 60 * 24); // 1 day

        return response()->json([
            //En la respuesta devolvemos usuario y token
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }

    /**
     * This PHP code defines a logout method that deletes the current access token for the user making the request and removes the 'token' cookie. It then returns a JSON response indicating successful logout.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        $cookie = cookie()->forget('token');

        return response()->json([
            'message' => 'Logged out successfully!'
        ])->withCookie($cookie);
    }

    /**
     * This PHP code defines a method called user that takes a request object as an argument. It creates a new UserResource object using the user retrieved from the request, and returns it.
     */
    public function user(Request $request)
    {
        return new UserResource($request->user());
    }
}
