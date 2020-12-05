<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\repositories\OrderRepository;

class OrderController extends Controller
{
    public $orderRepository;

    public function __construct(OrderRepository $orderRepository) {
        $this->orderRepository = $orderRepository;
    }

    public function index()
    {
        $orders = $this->orderRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Orders List',
            'data'    => $orders
        ]);
    }

    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'customer_id' => 'required',
            'shipping_id' => 'required',
        ], [
            'customer_id.required' => 'Please give customer id',
            'shipping_id.required' => 'Please give shipping id',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $orders = $this->orderRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Order Stored',
            'data'    => $orders
        ]);
    }

    public function destroy($id)
    {
        $orders = $this->orderRepository->findById($id);
        if (is_null($orders)) {
            return response()->json([
                'success' => false,
                'message' => 'Order Not found',
                'data' => null,
            ]);
        }

        $orders = $this->orderRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Order Deleted',
            'data'    => $orders
        ]);
    }
}
