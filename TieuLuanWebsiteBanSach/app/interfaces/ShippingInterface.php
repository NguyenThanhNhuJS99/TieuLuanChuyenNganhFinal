<?php

namespace App\interfaces;
use Illuminate\Http\Request;

interface ShippingInterface 
{
    public function create(Request $request);
}