<?php

// app/Http/Controllers/ProductController.php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'max_price' => 'nullable|numeric',
        ]);

        $maxPrice = (int) $request->input('max_price') ?? 300;
        if ($maxPrice === 0) {
            $maxPrice = 300;
        }

        $products = Product::where('is_active', true)->where('priority', '>', 0)
            ->whereHas('productDetails', function ($query) use ($maxPrice) {
                $query->where('price', '<=', $maxPrice);
            })
            ->withCount([
                'productDetails as variant_count' => function ($query) use ($maxPrice) {
                    $query->where('price', '<=', $maxPrice);
                }
            ])
            ->orderBy('priority', 'asc')
            ->get();

        return view('products.index', [
            'products' => $products,
            'maxPrice' => $maxPrice,
        ]);
    }

    public function show(string $product_id)
    {
        $product = Product::findOrFail($product_id);
        $productImages = $product->productImages;
        $productVariants = $product->productDetails;

        return view('products.show', [
            'product' => $product,
            'productImages' => $productImages,
            'productVariants' => $productVariants,
        ]);
    }

    //Metodos Para la pagina de inicio
    public function inicio()
    {
        // Llama al método topPriorityProducts para obtener los productos de mayor prioridad
        $topPriorityProducts = $this->topPriorityProducts();

        // Pasa los productos de mayor prioridad a la vista 'inicio.blade.php'
        return view('inicio', ['topPriorityProducts' => $topPriorityProducts]);
    }

    // Este método devuelve los productos de mayor prioridad
    public function topPriorityProducts()
    {
        $products = Product::where('is_active', true)
            ->where('priority', '>=', 1) // Solo productos con prioridad 1, 2 o 3
            ->select('id', 'idPicanova', 'name', 'ENG_description', 'CAT_description', 'ESP_description', 'priority') // Seleccionar los campos necesarios
            ->orderBy('priority', 'desc') // Ordenar por prioridad de forma descendente
            ->take(3) // Tomar solo los primeros tres productos
            ->get();

        return $products;
    }
}
