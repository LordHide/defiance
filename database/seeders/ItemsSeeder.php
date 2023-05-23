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
                'socket_type' => "_hand",
                'typeEs' => "Arma Ligera, Trisha",
                'typeEn' => "light weapon, Trisha"
            ],
            [
                'nameEs' => "MONO DE TRABAJO",
                'nameEn' => "WORK OVERALL",
                'socket_type' => "_chest",
                'typeEs' => "Armadura, Trisha",
                'typeEn' => "Armor, Trisha"
            ],
            [
                'nameEs' => "KIT DE REPARACIÓN",
                'nameEn' => "REPAIR KIT",
                'socket_type' => "_equipment",
                'typeEs' => "Equipo Técnico, Trisha",
                'typeEn' => "Technical Equipment, Trisha"
            ],
            [
                'nameEs' => "CARGA-D",
                'nameEn' => "D-CHARGE",
                'socket_type' => "_equipment",
                'typeEs' => "Explosivo, Desechable, Trisha",
                'typeEn' => "Explosive, Expendable, Trisha"
            ],
            [
                'nameEs' => "AUTOMEDIKIT",
                'nameEn' => "AUTOMEDIKIT",
                'socket_type' => "_equipment",
                'typeEs' => "Equipo Médico, Trisha",
                'typeEn' => "Medical Equipment, Trisha"
            ],
        ]);
    }
}
