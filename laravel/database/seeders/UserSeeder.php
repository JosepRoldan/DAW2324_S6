<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('users')->insert([
            [
                'idRole' => 1,
                'name' => 'Macarena',
                'user' => 'macarena',
                'surname' => 'Gonzales',
                'password' => Hash::make('password'),
                'email' => 'macarenagonzales@customaize.com',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'idRole' => 2,
                'name' => 'Manager',
                'user' => 'manageraccount',
                'surname' => 'Account',
                'password' => Hash::make('password'),
                'email' => 'manageraccount@customaize.com',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'idRole' => 3,
                'name' => 'Customer',
                'user' => 'customersupport',
                'surname' => 'Support',
                'password' => Hash::make('password'),
                'email' => 'customersupport@customaize.com',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'idRole' => 1,
                'name' => 'Miquel',
                'user' => 'miquel',
                'surname' => 'Duran',
                'password' => Hash::make('password'),
                'email' => 'miquelduran@customaize.com',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'idRole' => 1,
                'name' => 'Jordi',
                'user' => 'jordi',
                'surname' => 'Navarro',
                'password' => Hash::make('password'),
                'email' => 'jordinavarro@customaize.com',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'idRole' => 1,
                'name' => 'Gabriel',
                'user' => 'gabriel',
                'surname' => 'Urs',
                'password' => Hash::make('password'),
                'email' => 'gabrielurs@customaize.com',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'idRole' => 1,
                'name' => 'Josep',
                'user' => 'josep',
                'surname' => 'Roldan',
                'password' => Hash::make('password'),
                'email' => 'joseproldan@customaize.com',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'idRole' => 1,
                'name' => 'Roger',
                'user' => 'roger',
                'surname' => 'Arques',
                'password' => Hash::make('password'),
                'email' => 'rogerarques@customaize.com',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ]);
    }
}
