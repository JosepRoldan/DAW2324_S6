<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;


class RedirectController extends Controller
{
    public function redirectFromImage(Request $request)
    {
        $idVariantValue = $request->input('idVariant');
        $idImageValue = $request->input('idImage');
        $idUser = $request->input('idUser');


        if(isset($idVariantValue, $idImageValue, $idUser)){
            
            //falta aislar la lógica en un modelo
            $variantExist = DB::table('variants')->where('idVariant', $idVariantValue)->exists();
            $imageIsFromUser = DB::table('generatedImages')->where('idCustomers', $idUser)
                                          ->where('idGI', $idImageValue)
                                          ->exists();

            if ($productoExist && $imageIsFromUser) {
              // Redireccionar a la página de lista de productos con los parámetros
                return "Añadir al carrito";
            
            }else{
                
                return "El al añadir el producto al carrito(imagen o producto erroneo)";
            }

        } elseif (isset($idVariantValue) && !isset($idImageValue, $idUser)) {
            
            return redirect()->route('daisy', ['idVariant' => $idVariantValue]);
        
        } elseif(isset($idImageValue, $idUser) && !isset($idVariantValue)){

            return redirect()->route('products.index', ['idImage' => $idImageValue, 'idUser' => $idUser]);

        }
    }
}
