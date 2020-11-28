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
Route::post('shipping/store', 'API\ShippingsController@store');

Route::get('auth/create-token', 'API\Auth\AuthAPIController@createToken');

Route::post('auth/login', 'API\Auth\AuthAPIController@login');
Route::post('auth/register', 'API\Auth\AuthAPIController@register');

Route::get('auth/create-token-checkout', 'API\Auth\CustomerAPIController@createToken');

Route::post('auth/login-checkout', 'API\Auth\CustomerAPIController@login');
Route::post('auth/register-checkout', 'API\Auth\CustomerAPIController@register');


