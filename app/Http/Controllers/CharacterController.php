<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Character;

class CharacterController extends Controller
{
   /**
     * Show the profile for a given Character.
     *
     * @param  int  $id
     * @return Character info
     */
    public function show($id)
    {die(var_dump(Character::findOrFail($id)->attributes));
        return Character::findOrFail($id);
    }
}
