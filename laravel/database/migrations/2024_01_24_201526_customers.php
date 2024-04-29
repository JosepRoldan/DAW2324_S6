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
            $table->id();
            $table->string('name')->nullable();
            $table->string('surname')->nullable();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('mail')->unique();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('postcode')->nullable();
            $table->string('city')->nullable();
            $table->string('idCountry')->nullable();
            $table->boolean('is_validated')->default(false);
            $table->timestamps();
            $table->timestamp('membershipDate')->nullable();
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
