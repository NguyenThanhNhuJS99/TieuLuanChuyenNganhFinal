<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Staff;
use App\repositories\StaffRepository;

class StaffAPIController extends Controller
{
    public $staffRepository;

    public function __construct(StaffRepository $staffRepository)
    {
        $this->staffRepository = $staffRepository;
    }

    public function createToken()
    {
        $staff = Staff::first();
        $accessToken = $staff->createToken('Token Name')->accessToken;
        return $accessToken;
    }

    public function login(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'email' => 'required',
            'password' => 'required',
        ], [
            'email.required' => 'Please give your email address',
            'password.required' => 'Please give your password',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        if ($this->staffRepository->checkIfStaffAuthenticated($request)) {
            $staff = $this->staffRepository->findUserByEmailAddress($request->email);
            $accessToken = $staff->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Logged in successully !!',
                'staff' => $staff,
                'access_token' => $accessToken,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Sorry Invalid Email and Password',
                'errors' => null,
            ]);
        }
    }

    public function register(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required|min:2|max:30',
            'email' => 'required|email|max:100|unique:users',
            'password' => 'required|confirmed|min:6',
        ], [
            'name.required' => 'H??y ??i???n t??n.',
            'name.min' => 'T??n ng?????i d??ng ph???i c?? 2-30 k?? t???.',
            'name.max' => 'T??n ng?????i d??ng ph???i c?? 2-30 k?? t???.',
            'email.required' => 'H??y ??i???n ?????a ch??? email.',
            'email.max' => '?????a ch??? email ch???a nhi???u nh???t 100 k?? t???.',
            'email.email' => '?????a ch??? email kh??ng h???p l???.',
            'email.unique' => '?????a ch??? Email b???n ????ng k?? ???? t???n t???i. H??y ????ng k?? t??i kho???n v???i ?????a ch??? Email kh??c.',
            'password.required' => 'H??y ??i???n m???t kh???u.',
            'password.min' => 'M???t kh???u ph???i c?? ??t nh???t 6 k?? t???.',
            'password.confirmed' => 'M???t kh???u kh??ng tr??ng kh???p.',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $staff = $this->staffRepository->registerUser($request);
        if(!is_null($staff)){
            $staff = $this->staffRepository->findUserByEmailAddress($request->email);
            $accessToken = $staff->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => '????ng k?? t??i kho???n th??nh c??ng',
                'staff' => $staff,
                'access_token' => $accessToken,
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => '????ng k?? t??i kho???n th???t b???i',
                'errors' => null,
            ]);
        }
    }
}
