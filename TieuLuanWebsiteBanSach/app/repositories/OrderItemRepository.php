<?php

namespace App\repositories;
use App\interfaces\OrderItemInterface;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemRepository implements OrderItemInterface{

    public function findById($id){
        $orderitems = OrderItem::with('order')
            ->find($id);
        return $orderitems;
    }
    public function getAll(){
        $orderitems = OrderItem::get();
        return $orderitems;
    }
    public function create(Request $request){
        $orderitems = new OrderItem();
        $orderitems->order_id=$request->order_id;
        $orderitems->item_name=$request->item_name;
        $orderitems->item_quantity=$request->item_quantity;
        $orderitems->item_originalPrice=$request->item_originalPrice;
        $orderitems->item_price=$request->item_price;
        $orderitems->item_totalmoney=$request->item_totalmoney;
        $orderitems->item_image=$request->item_image;
        $orderitems->save();
        return $orderitems;
    }
    public function delete($id){
        $orderitems = $this->findById($id);
        $orderitems->delete();
        return $orders;
    }
}
