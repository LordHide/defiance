<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\InfoIcon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;

class RegisteredUserController extends Controller
{

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): array
    {
        $response = ["success" => 0];
        $validation = Validator::make($request->all(), 
            [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', Rules\Password::defaults()],
            ]
        );

        if(!$validation->fails()){
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            event(new Registered($user));

            Auth::login($user);
            $response["success"] = 1;
            $response["data"]["name"] = auth()->user()->name;
            $response["data"]["token"] = $request->user()->createToken(auth()->user()->name)->plainTextToken;
            $iconList = [];
            $iconAll = InfoIcon::select('*')
            ->get();

            foreach($iconAll as $icon){
                $iconList[$icon["id"]] = $icon;
            }
            $response["listIcons"] = $iconList;
        }
        else{
            $response["errors"] = $validation->errors();
        }

        return $response;
    }
}
