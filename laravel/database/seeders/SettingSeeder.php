<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('settings')->insert([
            [ 'config' => 'Picanova API Key', 'value' => env('PICANOVA_API_KEY') ],
            [ 'config' => 'Dall-e API Key', 'value' => env('DALL_E_API_KEY') ],
            [ 'config' => 'BigJPG API Key', 'value' => env('BIGJPG_API_KEY') ],
            [ 'config' => 'Google Tag Manager', 'value' => env('GOOGLE_TAG_MANAGER') ],
        ]);
    }
}
