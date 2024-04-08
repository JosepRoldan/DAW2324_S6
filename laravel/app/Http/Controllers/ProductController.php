<?php

// app/Http/Controllers/ProductController.php

namespace App\Http\Controllers;

use App\Models\Product;

class ProductController extends Controller
{


    public function index()
    {
        $products = Product::where('is_active', 1)
            ->with('productImages')
            ->orderBy('name', 'asc')
            ->get();
            
        return view('products.index', [
            'products' => $products,
        ]);
    }

    public function show(String $product_id)
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

}
