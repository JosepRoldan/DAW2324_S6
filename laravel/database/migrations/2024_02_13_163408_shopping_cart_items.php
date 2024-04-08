<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('shoppingCartItems', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idCart')->references('id')->on('shoppingCarts');
            $table->foreignId('idProduct')->references('id')->on('products');
            $table->foreignId('idGI')->references('idGI')->on('generatedImages');
            $table->string('variant');
            $table->integer('quantity');
            $table->decimal('price', 6, 2);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shoppingCartItems');
    }
};
