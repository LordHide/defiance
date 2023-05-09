<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthenticatedSessionController extends Controller
{

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): array
    {
        $response = ["success" => 0];
        $validation = Validator::make($request->all(),
            [
                'email' => 'required|email',
                'password' => 'required',
            ]
        );

        if(!$validation->fails() && Auth::attempt($request->all())){
            $request->session()->regenerate();
            $response["success"] = 1;
            $response["data"]["name"] = auth()->user()->name;
            $response["data"]["token"] = $request->user()->createToken(auth()->user()->name)->plainTextToken;
        }
        else{
            $response["errors"] = !$validation->fails() ? ["email" => ["We are not able to find an account with that username and password combination."]] : $validation->errors();
        }

        return $response;
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): void
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

    }
}
