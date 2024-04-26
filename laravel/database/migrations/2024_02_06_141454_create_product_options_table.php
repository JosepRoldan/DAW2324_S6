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
        Schema::create('product_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idProduct')->references('id')->on('products')->onDelete('cascade');
            $table->integer('variant_id');
            $table->foreign('variant_id')->references('variant_id')->on('product_details');
            $table->string('option_id_picanova')->index();
            $table->string('name');
            $table->string('image')->nullable();
            $table->string('description')->nullable();
            $table->boolean('is_required');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_options');
    }
};
