<?php

namespace Database\Seeders;

use App\Models\Benefits;
use Illuminate\Database\Seeder;

class BenefitsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Benefits::factory()->count(12)->create();
    }
}
