<?php

namespace App\Http\Controllers;

use App\Http\Helpers\JwtAuth;
use App\Http\Interfaces\UserInterface;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller implements UserInterface
{
    //
    public function index()
    {
        $usuarios = User::select(
            'users.id',
            'tipo_documento',
            'numero_documento',
            'users.nombre',
            'apellido',
            'fecha_nacimiento',
            'ciudad_id',
            'email',
            'ciudads.nombre as ciudad'
        )
            ->join('ciudads','users.ciudad_id','=','ciudads.id')
            ->get();
        return response()->json($usuarios, 200);
    }



    public function show($id)
    {
        $user = User::where('id',$id)->get();
        return response()->json($user,200);
    }

    public function update(Request $request, $id)
    {
        $usuario = User::where('id',$id)->update([
            'tipo_documento'=>$request->tipo_documento,
            'numero_documento'=>$request->numero_documento,
            'nombre'=>$request->nombre,
            'apellido'=>$request->apellido,
            'fecha_nacimiento'=>$request->fecha_nacimiento,
            'ciudad_id'=>$request->ciudad_id,
            'email'=>$request->email,
        ]);

        return response()->json($usuario,200);
    }

    public function destroy($id)
    {
        User::where('id', $id)->delete();
        return response()->json(['message'=>'eliminado']);
    }

    public function registro(Request $request)
    {
        $reglas = [
            'tipo_documento'=>'required|string',
            'numero_documento'=>'required|integer|unique:users',
            'nombre'=>'required|string',
            'apellido'=>'required|string',
            'fecha_nacimiento'=>'required|date',
            'ciudad_id'=>'required|integer',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|string|min:6',
        ];
        $mensajes =[
            'tipo_documento.required'=>'El Tipo de documento es requerido',
            'tipo_documento.string'=>'Tipo de documento no valido',
            'numero_documento.required'=>'El numero de documento es requerido',
            'numero_documento.integer'=>'El numero de documento no es valido',
            'numero_documento.unique'=>'El numero documento ya se encuentra registrado',
            'nombre.required'=>'El Tipo de documento es requerido',
            'apellido.required'=>'El apellido es requerido',
            'fecha_nacimiento.required'=>'La fecha de nacimiento es requerida',
            'fecha_nacimiento.date'=>'La fecha de nacimiento no es valida',
            'ciudad_id.required'=>'La Ciudad es requerida',
            'ciudad_id.integer'=>'La Ciudad no es valida',
            'email.required'=>'El correo es requerido',
            'email.email'=>'El correo no es valido',
            'email.unique'=>'El correo ya se encuentra registrado',
            'password.required'=>'La contraseña es requerida',
        ];
        $validator = Validator::make($request->all(), $reglas, $mensajes);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json([
                'error'=> $errors
            ],400);
        }
        try {
            $usuario = User::create([
                'tipo_documento'=>$request->tipo_documento,
                'numero_documento'=>$request->numero_documento,
                'nombre'=>$request->nombre,
                'apellido'=>$request->apellido,
                'fecha_nacimiento'=>$request->fecha_nacimiento,
                'ciudad_id'=>$request->ciudad_id,
                'email'=>$request->email,
                'password'=> hash('sha256',$request->password),
            ]);

            return response()->json($usuario,200);

        }catch (\Exception $e){
            return  response()->json(['error'=>$e->getMessage()],500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required|string|email',
            'password'=>'required|string|min:6',
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json([
                'error'=> $errors
            ],400);
        }

        $email = $request->email;
        $password = $request->password;
        return  (new JwtAuth())->iniciarSesion($email, $password);
    }

}
