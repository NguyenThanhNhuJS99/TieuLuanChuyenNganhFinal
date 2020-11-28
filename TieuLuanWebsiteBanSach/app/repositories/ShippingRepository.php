<?php

namespace App\repositories;
use App\interfaces\ShippingInterface;
use App\Models\Shipping;
use Illuminate\Http\Request;

class ShippingRepository implements ShippingInterface{
    public function getAll(){
        $shippings = Shipping::get();
        return $shippings;
    }
    public function create(Request $request){
        $shippings = new Shipping();
        $shippings->name=$request->name;
        $shippings->email=$request->email;
        $shippings->note=$request->note;
        $shippings->address1=$request->address1;
        $shippings->province=$request->province;
        $shippings->phone=$request->phone;
        $shippings->save();
        return $shippings;
    }
}
