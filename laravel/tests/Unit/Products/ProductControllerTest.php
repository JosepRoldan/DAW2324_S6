<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductControllerTest extends TestCase
{
    // use RefreshDatabase;
    /** @test */
    public function index_shows_only_active_products()
    {
        // Prepare data
        $activeProduct = Product::where('is_active', true)->first();
        $inactiveProduct = Product::where('is_active', false)->first();

        $this->assertNotNull($activeProduct);
        $this->assertNotNull($inactiveProduct);

        // Test
        $response = $this->get('/products');

        // Assert
        $response->assertStatus(200);
        $response->assertViewIs('products.index');
        $response->assertViewHas('products', function ($products) use ($activeProduct, $inactiveProduct) {
            return $products->contains($activeProduct) && !$products->contains($inactiveProduct);
        });
    }

    /** @test */
    public function show_displays_product_correctly()
    {
        // Prepare data
        $product = Product::where('is_active', true)->first();

        // Test
        $response = $this->get("/products/{$product->id}");

        // Assert
        $response->assertStatus(200);
        $response->assertViewIs('products.show');
        $response->assertViewHas('product', function ($viewProduct) use ($product) {
            return $viewProduct->id === $product->id;
        });
    }
}
