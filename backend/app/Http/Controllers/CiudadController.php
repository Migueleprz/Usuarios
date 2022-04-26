<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\CiudadInteface;
use App\Models\Ciudad;
use Illuminate\Http\Request;

class CiudadController extends Controller implements CiudadInteface
{
    //
    public function index()
    {
        return response()->json(Ciudad::select('id','nombre')->get(),200);
    }
}
