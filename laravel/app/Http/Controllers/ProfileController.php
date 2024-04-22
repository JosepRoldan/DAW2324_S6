<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProfileModel;
use Illuminate\Support\Facades\Session;

class ProfileController extends Controller
{
    public function getUserProfileData()
    {
        $token = Session::get('token');
        $profile = ProfileModel::where('username', $token)->get();
        
        return response()->json($profile);
    }

    public function updateUserProfileData(Request $request)
    {
        $token = Session::get('token');
        $profile = ProfileModel::where('username', $token)->first();
        // Actualiza los valores del perfil con los datos enviados desde el frontend
        $profile->name = $request->name;
        $profile->surname = $request->surname;
        $profile->mail = $request->mail;
        $profile->phone = $request->phone;
        $profile->address = $request->address;
        $profile->save();
        
        return response()->json(['message' => 'Profile updated successfully 3', 'profile' => $profile]);
    }
}
