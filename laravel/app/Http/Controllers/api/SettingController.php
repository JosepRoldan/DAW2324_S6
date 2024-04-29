<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SettingController extends Controller
{
    public function index()
    {
        try {
            $settings = Setting::all();
            return $settings;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener la configuración.'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $setting = new Setting();
            $setting->config = $request->config;
            $setting->value = $request->value;
            $setting->save();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al almacenar la configuración.'], 500);
        }
    }

    public function show($id)
    {
        try {
            $setting = Setting::findOrFail($id);
            return $setting;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Configuración no encontrada.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener la configuración.'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $setting = Setting::findOrFail($id);
            $setting->config = $request->config;
            $setting->value = $request->value;
            $setting->save();
            return $setting;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Configuración no encontrada.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar la configuración.'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $setting = Setting::destroy($id);
            return $setting;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Configuración no encontrada.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar la configuración.'], 500);
        }
    }
}
