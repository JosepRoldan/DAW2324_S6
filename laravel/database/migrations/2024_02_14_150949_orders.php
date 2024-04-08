<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
        
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idCustomers')->references('idCustomers')->on('customers');
            $table->string('name',50);
            $table->string('surname', 60);
            $table->timestamp('datetime');
            $table->string('address', 50);            
            $table->string('country', 40);
            $table->string('city', 40);
            $table->string('postcode',6);
            $table->string('state', 50);
            $table->enum('orderStatus', ['Pending', 'Accepted', 'Processing', 'Sent', 'Delivered'])->default('Pending');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
