<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $table = "order_details";

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function shipping()
    {
        return $this->belongsTo(Shipping::class);
    }
}
