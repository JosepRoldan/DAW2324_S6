<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'roleName' => 'Admin',
                'permission' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'roleName' => 'Manager',
                'permission' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'roleName' => 'Customer Support',
                'permission' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
