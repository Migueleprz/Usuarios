<?php

namespace Database\Seeders;

use App\Models\Ciudad;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class CiudadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['nombre'=>'Cali'],
            ['nombre'=>'Cartagena'],
            ['nombre'=>'Medellín'],
            ['nombre'=>'Bucaramanga'],
            ['nombre'=>'Bogotá'],
            ];
        foreach ($data as $ciudades)
        {
            Ciudad::create($ciudades);
        }

    }
}
