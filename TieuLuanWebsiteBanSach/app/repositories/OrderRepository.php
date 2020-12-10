<?php

namespace App\repositories;
use App\interfaces\OrderInterface;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderRepository implements OrderInterface{

    public function findById($id){
        $orders = Order::with('order_items')
            ->find($id);
        return $orders;
    }
    public function getAll(){
        $orders = Order::get();
        return $orders;
    }
    public function create(Request $request){
        $orders = new Order();
        $orders->customer_id=$request->customer_id;
        $orders->name=$request->name;
        $orders->email=$request->email;
        $orders->note=$request->note;
        $orders->city=$request->city;
        $orders->province=$request->province;
        $orders->wards=$request->wards;
        $orders->phone=$request->phone;
        $orders->paymentMethod=$request->paymentMethod;
        $orders->status=$request->status;
        $orders->save();
        return $orders;
    }
    public function delete($id){
        $orders = $this->findById($id);
        $orders->orders()->delete();
        $orders->delete();
        return $orders;
    }
}
