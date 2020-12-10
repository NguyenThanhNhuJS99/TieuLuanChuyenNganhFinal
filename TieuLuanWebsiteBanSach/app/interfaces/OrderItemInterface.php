<?php

namespace App\interfaces;
use Illuminate\Http\Request;

interface OrderItemInterface 
{
    public function getAll();
    public function findById($id);
    public function create(Request $request);
    public function delete($id);
}