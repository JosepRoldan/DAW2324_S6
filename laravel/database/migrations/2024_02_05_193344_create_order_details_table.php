<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idOrder')->references('id')->on('orders')->onDelete('cascade');
            $table->foreignId('idProduct')->references('id')->on('products')->onDelete('cascade');
            //$table->foreignId('idGeneratesImage')->constrained();
            $table->integer('idVariant')->nullable();
            $table->integer('quantity');
            $table->decimal('priceEach', 6, 2);
            $table->decimal('shippingPrice', 6, 2)->nullable();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
