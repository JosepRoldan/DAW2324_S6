<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('shoppingCarts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idCustomers')->references('idCustomers')->on('customers')->nullable(false); 
            $table->timestamp('date')->nullable(true);
            $table->float('total')->nullable(true)->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shoppingCart');
    }
};
