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
            Schema::create('orderDetails', function (Blueprint $table) {
                $table->id();
                $table->foreignId('idOrder')->references('id')->on('orders')->nullable(false);
                $table->foreignId('idProduct')->references('id')->on('products')->nullable(false);
                $table->foreignId('idGI')->references('idGI')->on('generatedImages')->nullable(false);
                $table->integer('variant')->nullable(false);
                $table->integer('quantity')->nullable(false);
                $table->decimal('priceEach', 6, 2)->nullable(false);
                $table->decimal('shippingPrice', 6, 2)->nullable(true);
            });
        }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orderDetails');
    }
};
