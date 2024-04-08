<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        DB::unprepared('
            CREATE TRIGGER update_total_shopping_cart
            AFTER INSERT ON shoppingCartItems
            FOR EACH ROW
            BEGIN
                UPDATE shoppingCarts
                SET total = (SELECT SUM(price * quantity) FROM shoppingCartItems WHERE id = NEW.idCart)
                WHERE id = NEW.idCart;
            END
        ');
    }

    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS update_total_shopping_cart');
    }
};

