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
        Schema::create('generatedImages', function (Blueprint $table) {
            $table->id('idGI');
            $table->unsignedBigInteger('idCustomers');
            $table->foreign('idCustomers')->references('id')->on('customers');
            $table->string('prompt')->nullable(false);
            $table->string('path')->nullable(false);
            $table->decimal('cost')->nullable(false);
            $table->boolean('is_saved')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('generatedImages');
    }
};
