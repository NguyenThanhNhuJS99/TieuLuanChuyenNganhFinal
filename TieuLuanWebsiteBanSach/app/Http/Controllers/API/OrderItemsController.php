<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\OrderItemRepository;
use Illuminate\Http\Request;

class OrderItemsController extends Controller
{
    public $orderItemRepository;

    public function __construct(OrderItemRepository $orderItemRepository) {
        $this->orderItemRepository = $orderItemRepository;
    }

    public function index()
    {
        $orderitems = $this->orderItemRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Order Item List',
            'data'    => $orderitems
        ]);
    }

    public function show($id)
    {
        $orderitems = $this->orderItemRepository->findById($id);
        if(is_null($orderitems))
        {
            return response()->json([
                'success' => false,
                'message' => 'Order Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Order Details',
            'data'    => $orderitems
        ]);
    }

    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'order_id' => 'required',
            'item_name' => 'required',
            'item_quantity' => 'required',
            'item_originalPrice' => 'required',
            'item_price' => 'required',
            'item_totalmoney' => 'required',
            'item_image' => 'required',
        ], [
            'order_id.required' => 'Please give order id',
            'item_name.required' => 'Please give item_name',
            'item_quantity.required' => 'Please give item_quantity',
            'item_originalPrice' => 'Please give item_originalPrice',
            'item_price.required' => 'Please give item_price',
            'item_totalmoney.required' => 'Please give item_totalmoney',
            'item_image.required' => 'Please give book item_image',          
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $orderitems = $this->orderItemRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Order Item Stored',
            'data'    => $orderitems
        ]);
    }

    // public function update(Request $request, $id)
    // {
    //     $orderitems = $this->orderItemRepository->findById($id);
    //     if (is_null($orderitems)) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Order Item Not found',
    //             'data' => null,
    //         ]);
    //     }

    //     $formData = $request->all();
    //     $validator = \Validator::make($formData, [
    //         'order_id' => 'required',
    //         'item_name' => 'required',
    //         'item_quantity' => 'required',
    //         'item_originalPrice' => 'required',
    //         'item_price' => 'required',
    //         'item_totalmoney' => 'required',
    //         'item_image' => 'required',
    //     ], [
    //         'order_id.required' => 'Please give order id',
    //         'item_name.required' => 'Please give item_name',
    //         'item_quantity.required' => 'Please give item_quantity',
    //         'item_originalPrice' => 'Please give item_originalPrice',
    //         'item_price.required' => 'Please give item_price',
    //         'item_totalmoney.required' => 'Please give item_totalmoney',
    //         'item_image.required' => 'Please give book item_image',   
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => $validator->getMessageBag()->first(),
    //             'errors' => $validator->getMessageBag(),
    //         ]);
    //     }

    //     $orderitems = $this->bookRepository->edit($request, $id);
    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Book Updated',
    //         'data'    => $books
    //     ]);
    // }

    public function destroy($id)
    {
        $orderitems = $this->orderItemRepository->findById($id);
        if (is_null($orderitems)) {
            return response()->json([
                'success' => false,
                'message' => 'Order Item Not found',
                'data' => null,
            ]);
        }

        $orderitems = $this->orderItemRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Order Item Deleted',
            'data'    => $orderitems
        ]);
    }
}
