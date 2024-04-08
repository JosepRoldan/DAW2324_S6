<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function changeLanguage(Request $request)
    {
        // Obtenemos el nuevo idioma desde la solicitud
        $language = $request->input('language');
        
        // Cambiamos el idioma de la aplicación Laravel
        app()->setLocale($language);
        session()->put('locale', $language);
        $currentLanguage = app()->getLocale();
        return response()->json(['currentLanguage' => $currentLanguage]);
  
    }

    public function currentLanguage()
    {
        $currentLanguage = app()->getLocale();

        // Retornar el lenguaje actual en formato JSON
        return response()->json(['currentLanguage' => $currentLanguage]);
    }
}

