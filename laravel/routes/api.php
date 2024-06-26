<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\CustomerController;
use App\Http\Controllers\api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\SettingController;
use App\Http\Controllers\api\BenefitsController;
use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\api\OrderDetailsController;
use App\Http\Controllers\api\UserController;
/*
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);

//Group of routes that are authenticated through auth:sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/getBenefits', [BenefitsController::class, 'index']);
    Route::get('/getAllYears', [BenefitsController::class, 'getAllYears']);
    Route::delete('deleteBenefits/{id}', [BenefitsController::class, 'delete']);
    Route::post('createBenefit', [BenefitsController::class, 'create']);
    Route::post('UpdateBenefit', [BenefitsController::class, 'update']);
    Route::get('getOneBenefit/{id}', [BenefitsController::class, 'getOne']);
    Route::get('getBenefitsByYear/{year}', [BenefitsController::class, 'getBenefitsByYear']);
    // PRODUCTS
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    // SETTINGS
    Route::resource('/settings', SettingController::class);
    // CUSTOMERS
    Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::post('/customers/create', [CustomerController::class, 'store'])->name('customer.store');
    Route::put('/customers/{id}', [CustomerController::class, 'update'])->name('customers.update');
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])->name('customers.destroy');
    Route::get('/customers/{id}/customerOrders', [CustomerController::class, 'userOrders'])->name('customers.orders');
    //Users
    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::post('/createUser',  [UserController::class, 'store']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/logout', [AuthController::class, 'logout']);
    // ORDERS
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/OrderDetails', [OrderDetailsController::class, 'index']);
    Route::get('/OrderDetails/{id}', [OrderDetailsController::class, 'show']);
});


