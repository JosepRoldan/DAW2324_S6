<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Benefits>
 */
class BenefitsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

        /**
     * Array to keep track of used months.
     *
     * @var array
     */
    protected $usedMonths = [];


    public function definition()
    {
        $month = $this->getUniqueMonth();
        $income = rand(3000, 7000);
        $expense = rand(1000, 3000);

        return [
            'month' => $month,
            'income' => $income,
            'expense' => $expense,
            'profit' => $income - $expense,
            'year' => 2024,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }


       /**
     * Get a unique month that hasn't been used yet.
     *
     * @return string
     */
    protected function getUniqueMonth()
    {
        $month = $this->faker->monthName;

        while (in_array($month, $this->usedMonths)) {
            $month = $this->faker->monthName;
        }

        $this->usedMonths[] = $month;

        return $month;
    }
}
