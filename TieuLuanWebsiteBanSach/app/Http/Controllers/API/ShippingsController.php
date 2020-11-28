<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\ShippingRepository;
use Illuminate\Http\Request;

class ShippingsController extends Controller
{
    public $shippingRepository;

    public function __construct(ShippingRepository $shippingRepository) {
        $this->shippingRepository = $shippingRepository;
    }

    public function index()
    {
        $shippings = $this->shippingRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Shipping List',
            'data'    => $shippings
        ]);
    }

    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'email' => 'required',
            'address1' => 'required',
            'province' => 'required',
            'phone' => 'required',
            'note' => 'required',
        ], [
            'name.required' => 'Please give name for shipping',
            'email.required' => 'Please give email for shipping',
            'address1.required' => 'Please give book address for shipping',
            'province.required' => 'Please give province for shipping',
            'phone.required' => 'Please give phone for shipping',
            'note.required' => 'Please give note for shipping',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $shippings = $this->shippingRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'ShippingItems Stored',
            'data'    => $shippings
        ]);
    }

}
