<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('categories', 'API\CategoriesController');
Route::apiResource('books', 'API\BooksController');

Route::get('order', 'API\OrdersController@index');
Route::post('order/store', 'API\OrdersController@store');
Route::delete('order/delete/{id}', 'API\OrdersController@destroy');

Route::get('orderitem', 'API\OrderItemsController@index');
Route::post('orderitem/store', 'API\OrderItemsController@store');
Route::delete('orderitem/delete/{id}', 'API\OrderItemsController@destroy');

Route::get('auth/create-token', 'API\Auth\AuthAPIController@createToken');

Route::post('auth/login', 'API\Auth\AuthAPIController@login');
Route::post('auth/register', 'API\Auth\AuthAPIController@register');

Route::get('auth/create-token-checkout', 'API\Auth\CustomerAPIController@createToken');

Route::post('auth/login-checkout', 'API\Auth\CustomerAPIController@login');
Route::post('auth/register-checkout', 'API\Auth\CustomerAPIController@register');

Route::get('delivery', 'API\DeliveryController@delivery');
Route::get('feeship', 'API\DeliveryController@index');
Route::post('/update-delivery','API\DeliveryController@update_delivery');
Route::post('/select-feeship','API\DeliveryController@select_feeship');
Route::post('/select-delivery','API\DeliveryController@select_delivery');
Route::post('/insert-delivery','API\DeliveryController@insert_delivery');

