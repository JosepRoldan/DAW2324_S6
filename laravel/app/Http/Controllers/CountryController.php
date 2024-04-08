<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;

class CountryController extends Controller
{
    
    public function index()
    {
        $countries = Country::All();
        return $countries;
    }

    public function show($id)
    {
        // Obtén la comunidad por ID
        $country = Country::find($id);

        if (!$country) {
            abort(404); // O devuelve una vista de error
        }

        return $country;
    }

}
