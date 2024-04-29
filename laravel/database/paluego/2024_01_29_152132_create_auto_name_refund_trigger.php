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
            CREATE TRIGGER autoNameRefund BEFORE INSERT ON refunds
            FOR EACH ROW
            BEGIN
                IF NEW.name IS NULL OR NEW.name = "" THEN
                    SET NEW.name = (
                        SELECT CONCAT(c.name, " ", c.surnames)
                        FROM clients c
                        INNER JOIN orders o ON c.idClient = o.idClient
                        WHERE o.idOrder = NEW.idOrder
                        LIMIT 1
                    );
                END IF;
            END;
        ');
    }

    // ... down method
    public function down(): void
    {
        Schema::dropIfExists('auto_name_refund_trigger');
    }
};