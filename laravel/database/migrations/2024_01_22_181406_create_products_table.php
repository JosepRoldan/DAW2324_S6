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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('idPicanova');
            $table->string('name');
            $table->string('sku');
            $table->integer('dpi');
            $table->string('type');
            $table->boolean('is_active')->default(false);
            $table->string('ENG_description')->nullable();
            $table->string('CAT_description')->nullable();
            $table->string('ESP_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
