<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\User;
use Illuminate\Http\Request;
use Laravel\Passport\Client;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $passportGrantClient = Client::where('password_client', '1')->first();
        //dd($passportGrantClient);
        $data = [
            'grant_type' => 'password',
            'client_id' => $passportGrantClient->id,
            'client_secret' => $passportGrantClient->secret,
            'username' => $request->email,
            'password' => $request->password,
            'scope' => '*',
        ];

        $tokenRequest = Request::create('/oauth/token', 'post', $data);
        $tokenResponse = app()->handle($tokenRequest);
        $contentString = $tokenResponse->content();
        $tokenContent = json_decode($contentString , true);
        //dd($tokenContent['access_token']);
        if (!empty($tokenContent['access_token'] )){
            return $tokenResponse;
        }
        return response()->json([
            'message'=>'Wrong user or Pass!!!'
        ]);


        //return app()->handle($tokenRequest);


    }
    public function register(UserRegisterRequest $request)
    {
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password)
        ]);
        //dd($user);
        return response()->json([
            'user'=> $user,
            'success'=> 'ok'
        ]);
    }
}
