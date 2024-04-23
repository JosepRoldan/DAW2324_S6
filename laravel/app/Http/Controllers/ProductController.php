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

        $products = Product::where('is_active', true)
            ->where('priority', '>', 0)
            ->whereHas('productDetails', function ($query) use ($maxPrice) {
                // Multiplicar price por benefit_margin y compararlo con maxPrice
                $query->whereRaw('price * benefits_margin <= ?', [$maxPrice]);
            })
            ->withCount([
                'productDetails as variant_count' => function ($query) use ($maxPrice) {
                    // Contar variantes donde price multiplicado por benefit_margin es menor o igual a maxPrice
                    $query->whereRaw('price * benefits_margin <= ?', [$maxPrice]);
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

        // dd($product);

        return view('products.show', [
            'product' => $product,
            'productImages' => $productImages,
            'productVariants' => $productVariants,
        ]);
    }
}
