<?php

use App\Models\Industry;
use Illuminate\Database\Seeder;

class IndustriesSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->industriesList() as $item) {
            Industry::updateOrCreate(['id' => $item['id']], $item);
        }
    }

    private function industriesList(): Generator
    {
        yield [
            'id' => 1,
            'name' => 'Airlines/Aviation/Aerospace',
            'block' => 1,
            'position' => 1,
        ];

        yield [
            'id' => 2,
            'name' => 'Banking',
            'block' => 1,
            'position' => 2,
        ];

        yield [
            'id' => 3,
            'name' => 'E-Learning',
            'block' => 1,
            'position' => 3,
        ];

        yield [
            'id' => 4,
            'name' => 'Financial Services',
            'block' => 1,
            'position' => 4,
        ];

        yield [
            'id' => 5,
            'name' => 'Gambling',
            'block' => 1,
            'position' => 5,
        ];

        yield [
            'id' => 6,
            'name' => 'Healthcare',
            'block' => 1,
            'position' => 6,
        ];

        yield [
            'id' => 7,
            'name' => 'IoT',
            'block' => 1,
            'position' => 7,
        ];

        yield [
            'id' => 8,
            'name' => 'Logistics and Supply Chain',
            'block' => 1,
            'position' => 8,
        ];

        yield [
            'id' => 9,
            'name' => 'Real Estate',
            'block' => 1,
            'position' => 9,
        ];

        yield [
            'id' => 10,
            'name' => 'Retail & E-Commerce',
            'block' => 1,
            'position' => 10,
        ];

        yield [
            'id' => 11,
            'name' => 'Security',
            'block' => 1,
            'position' => 11,
        ];

        yield [
            'id' => 12,
            'name' => 'Telecommunications',
            'block' => 1,
            'position' => 12,
        ];

        yield [
            'id' => 13,
            'name' => 'Travel & Hospitality',
            'block' => 1,
            'position' => 13,
        ];

        yield [
            'id' => 14,
            'name' => 'Video & Multimedia',
            'block' => 1,
            'position' => 14,
        ];

        yield [
            'id' => 15,
            'name' => 'Animation',
            'block' => 2,
            'position' => 1,
        ];

        yield [
            'id' => 16,
            'name' => 'Apparel & Fashion',
            'block' => 2,
            'position' => 2,
        ];

        yield [
            'id' => 17,
            'name' => 'Architecture & Planning',
            'block' => 2,
            'position' => 3,
        ];

        yield [
            'id' => 18,
            'name' => 'Arts and Crafts',
            'block' => 2,
            'position' => 4,
        ];

        yield [
            'id' => 19,
            'name' => 'Automotive',
            'block' => 2,
            'position' => 5,
        ];

        yield [
            'id' => 20,
            'name' => 'Biotechnology',
            'block' => 2,
            'position' => 6,
        ];

        yield [
            'id' => 21,
            'name' => 'Business Supplies and Equipment',
            'block' => 2,
            'position' => 7,
        ];

        yield [
            'id' => 22,
            'name' => 'Chemicals',
            'block' => 3,
            'position' => 1,
        ];

        yield [
            'id' => 23,
            'name' => 'Civic & Social Organization',
            'block' => 3,
            'position' => 2,
        ];

        yield [
            'id' => 24,
            'name' => 'Computer Games',
            'block' => 3,
            'position' => 3,
        ];

        yield [
            'id' => 25,
            'name' => 'Computer Hardware',
            'block' => 3,
            'position' => 4,
        ];

        yield [
            'id' => 26,
            'name' => 'Computer Software',
            'block' => 3,
            'position' => 5,
        ];

        yield [
            'id' => 27,
            'name' => 'Construction',
            'block' => 3,
            'position' => 6,
        ];

        yield [
            'id' => 28,
            'name' => 'Consulting',
            'block' => 3,
            'position' => 7,
        ];

        yield [
            'id' => 29,
            'name' => 'Consumer Goods',
            'block' => 3,
            'position' => 8,
        ];

        yield [
            'id' => 30,
            'name' => 'Consumer Services',
            'block' => 3,
            'position' => 9,
        ];

        yield [
            'id' => 31,
            'name' => 'Cosmetics',
            'block' => 3,
            'position' => 10,
        ];

        yield [
            'id' => 32,
            'name' => 'Dairy',
            'block' => 3,
            'position' => 11,
        ];

        yield [
            'id' => 33,
            'name' => 'Design',
            'block' => 3,
            'position' => 12,
        ];

        yield [
            'id' => 34,
            'name' => 'Education Institutions',
            'block' => 3,
            'position' => 13,
        ];

        yield [
            'id' => 35,
            'name' => 'Electrical/Electronic Manufacturing',
            'block' => 3,
            'position' => 14,
        ];

        yield [
            'id' => 36,
            'name' => 'Events Services',
            'block' => 3,
            'position' => 15,
        ];

        yield [
            'id' => 37,
            'name' => 'Farming',
            'block' => 3,
            'position' => 16,
        ];

        yield [
            'id' => 38,
            'name' => 'Finance/Fintech',
            'block' => 3,
            'position' => 17,
        ];

        yield [
            'id' => 39,
            'name' => 'Food & Beverages',
            'block' => 3,
            'position' => 18,
        ];

        yield [
            'id' => 40,
            'name' => 'Food Production',
            'block' => 3,
            'position' => 19,
        ];

        yield [
            'id' => 41,
            'name' => 'Graphic Design',
            'block' => 3,
            'position' => 20,
        ];

        yield [
            'id' => 42,
            'name' => 'Health, Wellness and Fitness',
            'block' => 3,
            'position' => 21,
        ];

        yield [
            'id' => 43,
            'name' => 'Information Technology and Services',
            'block' => 3,
            'position' => 22,
        ];

        yield [
            'id' => 44,
            'name' => 'Insurance',
            'block' => 3,
            'position' => 23,
        ];

        yield [
            'id' => 45,
            'name' => 'Jewelry',
            'block' => 3,
            'position' => 24,
        ];

        yield [
            'id' => 46,
            'name' => 'Legal Services',
            'block' => 3,
            'position' => 25,
        ];

        yield [
            'id' => 47,
            'name' => 'Libraries',
            'block' => 3,
            'position' => 26,
        ];

        yield [
            'id' => 48,
            'name' => 'Manufacturing',
            'block' => 3,
            'position' => 27,
        ];

        yield [
            'id' => 49,
            'name' => 'Marketing and Advertising',
            'block' => 3,
            'position' => 28,
        ];

        yield [
            'id' => 50,
            'name' => 'Military',
            'block' => 3,
            'position' => 29,
        ];

        yield [
            'id' => 51,
            'name' => 'Mining & Metals',
            'block' => 3,
            'position' => 30,
        ];

        yield [
            'id' => 52,
            'name' => 'Newspapers/Magazines/Publishing',
            'block' => 3,
            'position' => 31,
        ];

        yield [
            'id' => 53,
            'name' => 'Oil & Energy',
            'block' => 3,
            'position' => 32,
        ];

        yield [
            'id' => 54,
            'name' => 'Religious Institutions',
            'block' => 4,
            'position' => 1,
        ];

        yield [
            'id' => 55,
            'name' => 'Research',
            'block' => 4,
            'position' => 2,
        ];

        yield [
            'id' => 56,
            'name' => 'Sports',
            'block' => 4,
            'position' => 3,
        ];

        yield [
            'id' => 57,
            'name' => 'Staffing and Recruiting',
            'block' => 4,
            'position' => 4,
        ];

        yield [
            'id' => 58,
            'name' => 'Utilities',
            'block' => 4,
            'position' => 5,
        ];

        yield [
            'id' => 59,
            'name' => 'Wholesale',
            'block' => 4,
            'position' => 6,
        ];

        yield [
            'id' => 60,
            'name' => 'Renewables & Environment',
            'block' => 1,
            'position' => 1
        ];

        yield [
            'id' => 61,
            'name' => 'Civil Engineering',
            'block' => 1,
            'position' => 1
        ];

        yield [
            'id' => 62,
            'name' => 'Machinery',
            'block' => 1,
            'position' => 1
        ];

        yield [
            'id' => 63,
            'name' => 'Pharmaceuticals',
            'block' => 1,
            'position' => 1
        ];
    }
}
