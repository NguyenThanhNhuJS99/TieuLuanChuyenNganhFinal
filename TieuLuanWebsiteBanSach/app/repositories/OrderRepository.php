<?php

namespace App\repositories;
use App\interfaces\OrderInterface;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderRepository implements OrderInterface{

    public function getAll(){
        $orders = Order::orderBy('id','desc')->get();
        return $orders;
    }
    public function findById($id){
        $orders = Order::with('customer')
            ->find($id);
        return $orders;
    }
    public function create(Request $request){
        $orders = new Order();
        $orders->customer_id=$request->customer_id;
        $orders->shipping_id=$request->shipping_id;
        $orders->save();
        return $orders;
    }
    public function delete($id){
        $orders = $this->findById($id);
        $orders->delete();
        return $orders;
    }
}
