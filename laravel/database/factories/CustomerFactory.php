<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    protected $model = Customer::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->firstName,
            'surname' => $this->faker->lastName,
            'username' => $this->faker->unique()->userName,
            'password' => bcrypt('secret'), // o puedes usar Hash::make('secret')
            'mail' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->optional()->phoneNumber,
            'address' => $this->faker->optional()->address,
            'postcode' => $this->faker->optional()->postcode,
            'idCountry' => $this->faker->optional()->randomDigit,
            'is_validated' => $this->faker->boolean,
            'membershipDate' => $this->faker->dateTimeThisYear(),
            'customerStatus' => $this->faker->randomElement(['Active', 'Inactive', 'Banned', 'Deleted']),
        ];
    }
}
