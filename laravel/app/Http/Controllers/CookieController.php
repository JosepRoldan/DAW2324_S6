<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;


class CookieController extends Controller
{
    public function checkToken(Request $request)
    {
        $cookie = $request->input('token');
        if($cookie != null){
            $isValidated = Customer::where('username', $cookie)->value('is_validated');
        if ($isValidated) {
            // El cliente està validado
            return response()->json(['status' => 1]);
        } else 
        {
            return response()->json(['status' => 2]);
        }
        }else{
            return response()->json(['status' => 3]);
        }
        
    }
}
