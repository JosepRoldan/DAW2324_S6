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
        Schema::create('product_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idProduct')->references('id')->on('products')->onDelete('cascade');
            $table->string('code');
            $table->integer('variant_id')->index();
            $table->string('variant_code');
            $table->string('sku');
            $table->string('name');
            $table->integer('format_width');
            $table->integer('format_height');
            $table->float('price');
            $table->string('currency');
            $table->string('formatted_price');
            $table->integer('price_in_subunit');
            $table->float('benefits_margin', 8, 2)->default(20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_details');
    }
};
