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
}
