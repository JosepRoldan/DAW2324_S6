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
        Schema::create('customers', function (Blueprint $table) {
            $table->id('idCustomers');
            $table->string('name')->nullable();
            $table->string('surname')->nullable();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('mail')->unique();
            $table->integer('phone')->nullable();
            $table->string('address')->nullable();
            $table->integer('postcode')->nullable();
            $table->string('country')->nullable();
            $table->timestamp('membershipDate')->nullable();
            // $table->timestamps();
            $table->boolean('isvalidated')->default(false);
            $table->enum('customerStatus', ['Active', 'Inactive', 'Banned', 'Deleted'])->default('Inactive');
        });    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
