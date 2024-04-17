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
            [
                'config' => 'Picanova API Key',
                'value' => '047c83b57e9ad2ecb7360154c5b6b213',
            ],
            [
                'config' => 'Dall-e API Key',
                'value' => 'c30dce2e1c3c9aafe0bf1ceeb68d9f7f',
            ],
            [
                'config' => 'BigJPG API Key',
                'value' => 'aebb870ef6ac718aa8bd442b1c993806',
            ],
            [
                'config' => 'Google Tag Manager',
                'value' => 'GTM-CA3DFFE52C546C',
            ],
        ]);
    }
}
