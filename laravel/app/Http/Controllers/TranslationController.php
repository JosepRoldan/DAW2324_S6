<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TranslationController extends Controller
{
    public function getTranslations(Request $request, $lang)
    {
        $translations = trans($lang);
        return response()->json($translations);
    }
}
