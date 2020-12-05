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
Route::get('/shopbansach/shipping', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/books/view/{id}', function(){
    return view('layouts.app');
});


Route::get('/shopbansach/onepay', 'API\ShippingsController@callbackOnePay');

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

Route::get('thue', function(){
    $condition = new \Darryldecode\Cart\CartCondition(array(
        'name' => 'VAT 12.5%',
        'type' => 'tax',
        'target' => 'subtotal', // this condition will be applied to cart's subtotal when getSubTotal() is called.
        'value' => '12.5%',
        'attributes' => array( // attributes field is optional
            'description' => 'Value added tax',
            'more_data' => 'more data here'
        )
    ));
    
    Cart::condition($condition);
    $cartSubTotal = Cart::getSubTotal();
    return $cartSubTotal;
});

Route::delete('clear', function(){
    $clear = Cart::clear();
    if($clear){
        return Cart::getContent();
    }
});

Auth::routes();
//Route::get('/home', 'HomeController@index')->name('home');