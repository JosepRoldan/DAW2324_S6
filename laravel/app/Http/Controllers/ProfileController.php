<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProfileModel;


class ProfileController extends Controller
{
    public function getUserProfileData()
    {
        $id = 1;
        $profile = ProfileModel::where('idCustomers', $id)->get();
        
        return response()->json($profile);
    }
}
