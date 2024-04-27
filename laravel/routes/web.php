<?php

use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\BuyingProcessController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\EnsureTokenIsValid;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\CustomerArea_Controller;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\MostrarImagenesController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RedirectController;
use App\Http\Controllers\MyImagesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MyOrdersController;
use App\Http\Controllers\ViewDetailsController;
use App\Http\Controllers\CookieController;

use App\Http\Controllers\LanguageController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
//LANGUAGE
use App\Http\Controllers\TranslationController;

Route::get('/translations/{lang}', [TranslationController::class, 'getTranslations']);


Route::get('/carrito', function () {return view('carrito');})->name('Carrito');

Route::get('/daisy', function () {return view('daisy');})->name('daisy');

Route::get('/productscard', function () {return view('productCard');});

//////////////////////SHOP PROCESS////////////////////////
Route::get('/Cart/Shipping', [BuyingProcessController::class, 'getShoppingOrdreDates'])->name('shipping');
Route::get('/Cart/payments/{totalAmount}',[BuyingProcessController::class,'paypal'])->name('payment');
Route::post('/Cart/Order', [OrdersController::class, 'storeDates'])->name('processShop.orderCreate');

Route::get('/shopProccess/success', [BuyingProcessController::class, 'success'])->name('processShop.success');
Route::get('/shopProccess/cancel', [BuyingProcessController::class, 'cancel'])->name('processShop.cancel');


Route::get('/Cart/Shipping/guess', function () {
    return view('processShop.guess');
});

////////////////////////////////////////

Route::get('/products', function () {
    return view('productList');
});

Route::get('/guidedGeneratedImage', function () {
    return view('guidedGeneratedImage');
})->name('guidedGeneratedImage');

Route::get('/productscard', function () {
    return view('productCard');
});
Route::get('/Inicio', [ProductController::class, 'inicio'])->name('inicio');


Route::get('/product', function () {return view('product');});

Route::get('/CustomerArea', function () {return view('clientArea');});

Route::get('/myImages', function () {return view('myImages');});

Route::get('/profile', function () {return view('profile');});

Route::get('/editProfile', function () {return view('editProfile');});


Route::get('/myOrders', function () {return view('myOrders');});

Route::get('/viewDetails', function () {return view('viewDetails');});



Route::get('/CustomerArea', [CustomerArea_Controller::class, 'getInitials']);


// AUTH
Route::get('/login', function () {return view('login');});
Route::post('/login', [RegisterController::class, 'login'])->name('customers.login');
Route::get('/sign_up', function () {return view('register');});
Route::post('/sign_up', [RegisterController::class, 'store'])->name('customers.store');
Route::get('/forgot', function () {return view('/auth/recover-password');})->name('forgot');
//Logout
Route::get('/logout', [RegisterController::class, 'logout'])->name('logout');

//Reset Password
use App\Models\ResetPasswordToken;
use App\Http\Controllers\ForgotPasswordController;

Route::post('/reset-password', [ResetPasswordToken::class, 'showResetForm'])->name('password.reset');

Route::get('/forgot-password', [ForgotPasswordController::class, 'showForgotPasswordForm'])->name('password.request');
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('/passwords/reset/{token}', function ($token) {return view('auth.passwords.reset', ['token' => $token]);})->name('password.reset.form');
Route::get('/error-reset', function () {return view('error-reset');})->name('error.route');



// PRODUCTS
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product_id}', [ProductController::class, 'show'])->name('products.show');

// IMAGES
Route::post('/enviar-prompt', [MostrarImagenesController::class, 'enviarPrompt']);
Route::post('/modi-prompt', [MostrarImagenesController::class, 'modiPrompt']);
Route::post('/save-img', [MostrarImagenesController::class, 'saveImg']);
Route::get('/redirect-from-image', [RedirectController::class, 'redirectFromImage']);
 

//Route::post('/productList', [ProductController::class, 'store'])->name('products.store');
Route::get('/product/{product}', [ProductController::class, 'show'])->name('show');

Route::post('/enviar-prompt', [MostrarImagenesController::class, 'enviarPrompt']);
Route::post('/modi-prompt', [MostrarImagenesController::class, 'modiPrompt']);

Route::get('/redirect-from-image', [RedirectController::class, 'redirectFromImage']);

//Footer
Route::get('/history', function () {return view('footer.history');});

Route::get('/career', function () {return view('footer.career');});

Route::get('/meet-the-team', function () {return view('footer.team');});

Route::get('/about-us', function () {return view('footer.aboutus');});

Route::get('/contact', function () {return view('footer.contact');});

Route::get('/faq', function () {return view('footer.faq');});

Route::get('/privacypolicy', function () {return view('footer.privacypolicy');});

Route::get('/termsandconditions', function () {return view('footer.termsandconditions');});

Route::get('/returnpolicy', function () {return view('footer.returnpolicy');});

Route::get('/accessibility', function () {return view('footer.accessibility');});

Route::get('/conditionsofpurchase', function () {return view('footer.conditionsofpurchase');});

Route::get('/legalnotice', function () {
    return view('footer.legalnotice');
});

//MyImages
Route::get('/getImages', [MyImagesController::class, 'getUserSavedImages']);

//Profile
Route::get('/getProfileData', [ProfileController::class, 'getUserProfileData']);
Route::put('/updateProfileData', [ProfileController::class, 'updateUserProfileData']);


//My Orders
Route::get('/getOrders', [MyOrdersController::class, 'getUserOrders']);
Route::get('/getUserProfileData', [MyOrdersController::class, 'getUserProfileData']);

//ViewDetails
Route::get('/viewDetailsOrder', [ViewDetailsController::class, 'getDetailsData']);
Route::get('/legalnotice', function () {return view('footer.legalnotice');});

//Header
Route::post('/change-language', [LanguageController::class, 'changeLanguage']);
Route::get('/current-language', [LanguageController::class, 'currentLanguage']);

//Token
Route::post('/check-token', [CookieController::class, 'checkToken']);
