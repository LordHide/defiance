<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Character;
use App\Models\BaseCharactersInfo;

class CharacterController extends Controller
{
   /**
     * Show the profile for a given Character.
     *
     * @param  int  $id
     * @return Character info
     */
    public function firstCharacterLoad(Request $request): array
    {
        $response = ["userCharacters" => [], "baseCharacters" => []];

        $character = Character::select('*')
            ->where('user_id', '=', auth()->user()->id)
            ->limit($request->userCharactersLimit)
            ->get();

        $baseCharactersInfo = BaseCharactersInfo::select('*')
            ->get();

        $response["baseCharacters"] = $baseCharactersInfo;
        $response["userCharacters"] = $character;

        return $response;
    }
}
