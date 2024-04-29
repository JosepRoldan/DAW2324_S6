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
            $table->foreignId('idCustomers')->references('id')->on('customers');
            $table->string('name', 100);
            $table->string('address', 100);
            $table->decimal('totalPrice');
            $table->timestamp('datetime');
            $table->enum('orderStatus', ['PreOrder', 'InProgress', 'Sent', 'Delivered', 'Canceled'])->default('PreOrder');$table->enum('orderStatus', ['PreOrder', 'InProgress', 'Sent', 'Delivered', 'Canceled', 'Pending'])->default('PreOrder');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
