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
        Schema::create('delivery_address', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idCustomers')->references('id')->on('customers');
            $table->string('address', 50);            
            $table->string('city', 40);
            $table->string('postcode',6);
            $table->string('state', 50);
            $table->string('country', 40);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_address');
    }
};
