<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Character;
use App\Models\SkilsAsociated;
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

        $response["userCharacters"] = $this->userCharacters($request->userCharactersLimit);
        $response["baseCharacters"] = $this->baseCharters();
        $response["charactersSkills"] = $this->charactersSkills();

        return $response;
    }

    private function charactersSkills(){

        $skillsList = [];

        $skills = SkilsAsociated::select('*')
            ->where('skills_asociated.asociated_type', '=', "character")
            ->join('skills', 'skills_asociated.skill_id', '=', 'skills.id')
            ->get();

        foreach($skills as $skill){
            $skillsList[$skill["asociated_id"]][$skill["group"]][] = [
                "text_es" => $skill["text_es"],
                "text_en" => $skill["text_en"],
                "Type" => $skill["Type"]
            ];
        }

        return $skillsList;
    }

    private function userCharacters($userCharactersLimit){
        $userCharacters = Character::select('*')
            ->where('user_id', '=', auth()->user()->id)
            ->limit($userCharactersLimit)
            ->get();
        return $userCharacters;
    }

    private function baseCharters(){
        $baseCharters = BaseCharactersInfo::select('*')
            ->get();
        return $baseCharters;
    }
}
