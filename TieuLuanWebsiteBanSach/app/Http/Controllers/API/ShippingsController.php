<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\ShippingRepository;
use Illuminate\Http\Request;
use App\Models\Shipping;
class ShippingsController extends Controller
{
    public $shippingRepository;

    public function __construct(ShippingRepository $shippingRepository) {
        $this->shippingRepository = $shippingRepository;
    }

    public function index()
    {
        $shippings = Shipping::paginate(4);
        return $shippings;
    }

    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'customer_id' => 'required',
            'name' => 'required',
            'email' => 'required',
            'address1' => 'required',
            'province' => 'required',
            'phone' => 'required',
            'note' => 'required',
        ], [
            'customer_id.required' => 'Please give customer id',
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

    public function destroy($id)
    {
        $shippings = $this->shippingRepository->findById($id);
        if (is_null($shippings)) {
            return response()->json([
                'success' => false,
                'message' => 'Shipping Not found',
                'data' => null,
            ]);
        }

        $shippings = $this->shippingRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Shipping Deleted',
            'data'    => $shippings
        ]);
    }
}
