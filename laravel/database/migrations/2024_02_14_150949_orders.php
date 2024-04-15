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
            $table->unsignedBigInteger('number_order');
            $table->foreignId('idCustomers')->references('idCustomers')->on('customers');
            $table->string('name',100);
            $table->string('address',100);
            $table->decimal('totalPrice');
            $table->timestamp('datetime');
            $table->enum('orderStatus', ['PreOrder', 'InProgres', 'Sent', 'Delivered','Canceled'])->default('PreOrder');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
