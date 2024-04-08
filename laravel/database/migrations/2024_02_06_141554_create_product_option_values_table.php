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
        Schema::create('product_option_values', function (Blueprint $table) {
            $table->id();
            $table->string('idOption');
            $table->foreign('idOption')->references('option_id_picanova')->on('product_options')->onDelete('cascade');
            $table->string('option_value_id_picanova');
            $table->string('name');
            $table->string('sku');
            $table->string('image_id');
            $table->string('image_original');
            $table->float('price');
            $table->string('currency');
            $table->string('formatted_price');
            $table->integer('price_in_subunit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_option_values');
    }
};
