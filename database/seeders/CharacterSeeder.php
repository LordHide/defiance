<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CharacterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('characters')->insert([
            'name' => "trisha",
            'type' => "Ingeniera",
            'nameFull' => "TRISHALA \"TRISHA\" N33",
            'colorPrimeR' => 103,
            'colorPrimeG' => 78,
            'colorPrimeB' => 167,
            'colorSeconR' => 72,
            'colorSeconG' => 48,
            'colorSeconB' => 132,
            'user_id' => 1
        ]);
    }
}
