<?php


namespace App\Http\Interfaces;


use App\Models\User;
use Illuminate\Http\Request;

interface UserInterface
{
    public function index();
    public function registro(Request $request);
    public function show($id);
    public function update(Request $request, $id);
    public function destroy($id);
    public  function login(Request $request);
}
