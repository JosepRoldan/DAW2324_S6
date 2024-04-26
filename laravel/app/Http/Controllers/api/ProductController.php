<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductDetail;

/**
 * Class ProductController
 * 
 * This class handles web requests related to Products, providing methods for retrieving,
 * displaying, and updating product information.
 */
class ProductController extends Controller
{
    /**
     * Display a listing of the product.
     *
     * This method retrieves all products along with their related product images and details.
     * It then returns these products as a JSON response.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = Product::with('productImages', 'productDetails')->get();

        return response()->json($products);
    }

    /**
     * Display the specified product.
     *
     * This method finds a single product by its ID, along with its related product images and details.
     * If the product is found, it returns the product as a JSON response. Otherwise, it returns a 404 error
     * with a message indicating that the product was not found.
     *
     * @param  int  $id  The ID of the product to retrieve.
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $product = Product::with(['productImages', 'productDetails'])->find($id);

        if ($product) {
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    /**
     * Update the specified product in storage.
     *
     * This method updates a single product's 'is_active' status based on the request input.
     * It requires the product ID to identify the product and updates it accordingly.
     * Upon successful update, it returns a JSON response with a success message and the updated product.
     *
     * @param  \Illuminate\Http\Request  $request  The request object containing the data to update.
     * @param  int  $id  The ID of the product to update.
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        if ($request->has('is_active')) {
            $product->is_active = $request->is_active;
            $product->save();

            return response()->json(['message' => 'Product activation status updated successfully.']);
        }

        if ($request->has('benefits_margin')) {
            $productDetails = ProductDetail::where('idProduct', $id)->get();

            if ($productDetails->isEmpty()) {
                return response()->json(['message' => 'Product details not found.'], 404);
            }

            foreach ($productDetails as $productDetail) {
                $productDetail->benefits_margin = $request->benefits_margin;
                $productDetail->save();
            }

            return response()->json(['message' => 'Product benefits margins updated successfully.']);
        }

        if ($request->has('ENG_description')) {
            $fieldsToUpdate['ENG_description'] = $request->ENG_description;
        }
        if ($request->has('CAT_description')) {
            $fieldsToUpdate['CAT_description'] = $request->CAT_description;
        }
        if ($request->has('ESP_description')) {
            $fieldsToUpdate['ESP_description'] = $request->ESP_description;
        }

        if ($request->has('priority')) {
            $fieldsToUpdate['priority'] = $request->priority;
        }

        if (!empty($fieldsToUpdate)) {
            $product->update($fieldsToUpdate);
            return response()->json(['message' => 'Product updated successfully.']);
        } else {
            return response()->json(['message' => 'No valid update field provided.'], 400);
        }
    }
}
