<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();
        return response()->json(['roles' => $roles], 200);
    }
}
