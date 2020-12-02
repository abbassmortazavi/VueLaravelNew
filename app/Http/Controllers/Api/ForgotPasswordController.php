<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(ForgotPasswordRequest $request)
    {
        // $this->validateEmail($request);
    //    dd($request->all());
   
        $response = $this->broker()->sendResetLink(
            $request->only('email')
        );
       // dd($response);
        return $response == Password::RESET_LINK_SENT
                    ? $this->sendResetLinkResponse($request, $response)
                    : $this->sendResetLinkFailedResponse($request, $response);


                    $response = $this->broker()->reset(
                        $this->credentials($request), function ($user, $password) {
                            $this->resetPassword($user, $password);
                        }
                    );
    }
    
    public function broker()
    {
        return Password::broker();
    }

    protected function sendResetLinkResponse(Request $request, $response)
    {
        return response()->json(['message'=>"Email has been sent"] , 200);
    }

    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return response()->json(['message'=>"Email has been Failed"] , 500);
    }
}
