<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Customer;
use App\Models\City;
use App\Models\Province;
use App\Models\Wards;
use App\Models\User;
use App\Models\Book;
use DB;
use App\repositories\CustomerRepository;

class CustomerAPIController extends Controller
{
    public $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    public function createToken()
    {
        $customer = Customer::first();
        $accessToken = $customer->createToken('Token Name')->accessToken;
        return $accessToken;
    }

    public function show($id)
    {
        $customer = $this->customerRepository->findById($id);
        if(is_null($customer))
        {
            return response()->json([
                'success' => false,
                'message' => 'Customer Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Customer Details',
            'data'    => $customer
        ]);
    }

    public function view_address_cus($id)
    {
        $customer = Customer::where('id', $id)->first();
        $customer_city = $customer->city;
        $customer_province = $customer->province;
        $customer_wards = $customer->wards;
        $city_cus = City::where('matp', $customer_city)->first();
        $province_cus = Province::where('maqh', $customer_province)->first();
        $wards_cus = Wards::where('xaid', $customer_wards)->first();

        return response()->json([
            'success' => true,
            'message' => 'Customer Details City',
            'city'    => $city_cus->name_city,
            'province'    => $province_cus->name_quanhuyen,
            'wards'    => $wards_cus->name_xaphuong
        ]);
    }

    
    public function search(Request $request){
        $keywords = $request->keywords_submit;
 
        $search_product = DB::table('books')->where('name','like','%'.$keywords.'%')->get();
        //$search_product = Book::where('name','like','%'.$keywords.'%')->get();

        return $search_product;
    }

    public function update(Request $request, $id)
    {
        $customer = $this->customerRepository->findById($id);
        if (is_null($customer)) {
            return response()->json([
                'success' => false,
                'message' => 'Customer Not found',
                'data' => null,
            ]);
        }

        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'email' => 'required',
            'city' => 'required',
            'province' => 'required',
            'wards' => 'required',
            'address' => 'required',
            'phone' => 'required'
        ], [
            'name.required' => 'Please give name',
            'email.required' => 'Please give email',
            'city.required' => 'Please give city',
            'province.required' => 'Please give province',
            'wards.required' => 'Please give wards',
            'address.required' => 'Please give address',
            'phone.required' => 'Please give phone',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $customer = $this->customerRepository->edit($request, $id);
        return response()->json([
            'success' => true,
            'message' => 'Customer Updated',
            'data'    => $customer
        ]);
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

        if ($this->customerRepository->checkIfAuthenticated($request)) {
            $customer = $this->customerRepository->findUserByEmailAddress($request->email);
            $accessToken = $customer->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Logged in successully !!',
                'customer' => $customer,
                'access_token' => $accessToken,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Xin l???i Email ho???c M???t kh???u kh??ng ????ng',
                'errors' => null,
            ]);
        }
    }

    public function register(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required|min:2|max:30',
            'email' => 'required|email|max:100|unique:customers',
            'password' => 'required|confirmed|min:6',
            'city' => 'required',
            'province' => 'required',
            'wards' => 'required',
            'address' => 'required',
            'phone' => 'required',
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
            'city.required' => 'H??y ??i???n ?????a ch??? city.',
            'province.required' => 'H??y ??i???n ?????a ch??? province.',
            'wards.required' => 'H??y ??i???n ?????a ch??? wards.',
            'address.required' => 'H??y ??i???n ?????a ch??? address.',
            'phone.required' => 'H??y ??i???n ?????a ch??? phone.',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $customer = $this->customerRepository->registerUser($request);
        if(!is_null($customer)){
            $customer = $this->customerRepository->findUserByEmailAddress($request->email);
            $accessToken = $customer->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => '????ng k?? t??i kho???n th??nh c??ng',
                'customer' => $customer,
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
