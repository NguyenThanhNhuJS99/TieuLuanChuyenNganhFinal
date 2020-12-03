<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/shopbansach', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/categories', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/categories/view/{id}', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/login', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/login-checkout', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/noitem', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/checkout', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/news', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/about', function(){
    return view('layouts.app');
});
//Route::post('/shipping/store', '')

// Shopping Cart
Route::post('add', 'cartController@add');
Route::delete('xoa-san-pham/{id}', 'cartController@xoasanpham');

Route::get('cart', function(){
    return Cart::getContent();
});

Route::get('totalCart', function(){
    $total = Cart::getTotal();
    return $total;
});

Route::get('totalQuantity', function(){
    $cartTotalQuantity = Cart::getTotalQuantity();
    return $cartTotalQuantity;
});

Route::put('tang-so-luong/{id}', 'cartController@tangsoluong');
Route::put('giam-so-luong/{id}', 'cartController@giamsoluong');

Route::delete('clear', function(){
    $clear = Cart::clear();
    if($clear){
        return Cart::getContent();
    }
});

Auth::routes();
//Route::get('/home', 'HomeController@index')->name('home');