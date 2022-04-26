<?php

use App\Http\Controllers\CiudadController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/ciudades',[CiudadController::class,'index']);
Route::post('/registro',[UserController::class,'registro']);
Route::post('/login',[UserController::class,'login']);

Route::middleware('auth.api')->group(function () {
    Route::resource('usuario', UserController::class)->only(['index', 'show', 'update', 'destroy']);
});

