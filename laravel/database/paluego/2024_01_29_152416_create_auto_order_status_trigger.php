<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
            CREATE TRIGGER autoOrderStatus BEFORE INSERT ON orders
            FOR EACH ROW
            BEGIN
                SET NEW.orderStatus = ("Pending");
            END;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auto_order_status_trigger');
    }
};
