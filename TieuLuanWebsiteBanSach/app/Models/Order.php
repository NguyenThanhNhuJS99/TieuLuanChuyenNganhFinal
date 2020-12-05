<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = "orders";

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function shipping()
    {
        return $this->belongsTo(Shipping::class);
    }
}
