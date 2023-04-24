<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class InfoIconsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('infoIcons')->insert([
            [
                'type' => "svg",
                'class' => "diceYellow"
            ],
            [
                'type' => "svg",
                'class' => "diceOrange"
            ],
            [
                'type' => "svg",
                'class' => "diceRed"
            ],
            [
                'type' => "svg",
                'class' => "diceblue"
            ],
            [
                'type' => "svg",
                'class' => "diceGreen"
            ],
            [
                'type' => "svg",
                'class' => "diceblack"
            ],
            [
                'type' => "svg",
                'class' => "damage"
            ],
            [
                'type' => "svg",
                'class' => "software"
            ],
            [
                'type' => "svg",
                'class' => "health"
            ],
            [
                'type' => "svg",
                'class' => "defense"
            ],
            [
                'type' => "svg",
                'class' => "agro"
            ],
            [
                'type' => "svg",
                'class' => "burning"
            ],
            [
                'type' => "svg",
                'class' => "stunned"
            ],
            [
                'type' => "svg",
                'class' => "marked"
            ],
            [
                'type' => "svg",
                'class' => "concentrated"
            ],
            [
                'type' => "svg",
                'class' => "immobilized"
            ],
            [
                'type' => "svg",
                'class' => "blind"
            ],
            [
                'type' => "svg",
                'class' => "poisoned"
            ],
            [
                'type' => "svg",
                'class' => "unconscious"
            ],
            [
                'type' => "svg",
                'class' => "hidden"
            ],
            [
                'type' => "svg",
                'class' => "wound"
            ],
            [
                'type' => "svg",
                'class' => "specialBlack"
            ],
            [
                'type' => "svg",
                'class' => "specialWhite"
            ],
            [
                'type' => "svg",
                'class' => "successBlack"
            ],
            [
                'type' => "svg",
                'class' => "successWhite"
            ],
            [
                'type' => "svg",
                'class' => "shield"
            ],
            [
                'type' => "svg",
                'class' => "guardBlack"
            ],
            [
                'type' => "svg",
                'class' => "guardWhite"
            ],
            [
                'type' => "svg",
                'class' => "hand"
            ],
            [
                'type' => "svg",
                'class' => "helmet"
            ],
            [
                'type' => "svg",
                'class' => "chest"
            ],
            [
                'type' => "svg",
                'class' => "equipment"
            ],
            [
                'type' => "svg",
                'class' => "package"
            ],
            [
                'type' => "svg",
                'class' => "action"
            ],
            [
                'type' => "svg",
                'class' => "fragment"
            ],
            [
                'type' => "svg",
                'class' => "movement"
            ]
        ]);
    }
}
