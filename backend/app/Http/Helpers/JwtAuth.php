<?php


namespace App\Http\Helpers;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class JwtAuth
{
    private $key;

    public function __construct()
    {
        $this->key = "+12-34-5/6/8/7+";
    }

    public function iniciarSesion($correo, $clave)
    {
        $usuario = User::where([
            'email' => $correo,
            'password' => hash('sha256', $clave)
        ])->first();

        $iniciar = false;
        if (is_object($usuario)) {
            $iniciar = true;
        }

        if ($iniciar) {
            $datos = array(
                'sub' => $usuario->id,
                'email' => $usuario->email,
                'name' => $usuario->name,
                'iat' => time(),
                'exp' => time() + (1 * 2 * 60 * 60)
            );
            $jwt = JWT::encode($datos, $this->key, 'HS256');
            return response()->json([
                'token' => $jwt,
                'user' => $datos
            ], 200);
        }
        return response()->json([
            'message' => 'Credenciales incorrectas.'
        ],422);

    }

    public  function verificaToken($token)
    {
        $jwt = str_replace('"','',$token);
        try {
            $decode = JWT::decode($jwt, new Key($this->key, 'HS256'));
            if(isset($decode->sub)){
                return true;
            }
            return false;
        }catch (\Exception $e) {
            return false;
        }
    }
}
