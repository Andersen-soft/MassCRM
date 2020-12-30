<?php

declare(strict_types=1);

use Illuminate\Database\Seeder;
use App\Models\Contact\Contact;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for ($i=0; $i <= 600_000; $i++)
        {
            $contact = (new Contact())
                ->setValue('first_name', $faker->firstName)
                ->setValue('last_name', $faker->lastName)
                ->setValue('full_name', sprintf('%s %s' ,$faker->firstName, $faker->lastName))
                ->setValue('gender', $faker->randomElement(['male', 'female']));

            $contact->save();
        }
    }
}
