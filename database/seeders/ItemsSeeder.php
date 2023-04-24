<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('item')->insert([
            [
                'nameEs' => "PISTOLA",
                'nameEn' => "PISTOL",
                'socket_type' => "/29",
                'typeEs' => "Arma Ligera, Trisha",
                'typeEn' => "light weapon, Trisha"
            ],
            [
                'nameEs' => "MONO DE TRABAJO",
                'nameEn' => "WORK OVERALL",
                'socket_type' => "/31",
                'typeEs' => "Armadura, Trisha",
                'typeEn' => "Armor, Trisha"
            ],
            [
                'nameEs' => "KIT DE REPARACIÓN",
                'nameEn' => "REPAIR KIT",
                'socket_type' => "/32",
                'typeEs' => "Equipo Técnico, Trisha",
                'typeEn' => "Technical Equipment, Trisha"
            ],
            [
                'nameEs' => "CARGA-D",
                'nameEn' => "D-CHARGE",
                'socket_type' => "/32",
                'typeEs' => "Explosivo, Desechable, Trisha",
                'typeEn' => "Explosive, Expendable, Trisha"
            ],
            [
                'nameEs' => "AUTOMEDIKIT",
                'nameEn' => "AUTOMEDIKIT",
                'socket_type' => "/32",
                'typeEs' => "Equipo Médico, Trisha",
                'typeEn' => "Medical Equipment, Trisha"
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
            ]
        ]);
    }
}
