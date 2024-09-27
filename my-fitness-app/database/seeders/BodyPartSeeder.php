<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BodyPartSeeder extends Seeder
{
    public function run()
    {
        DB::table('body_part')->insert([
            ['id' => 1, 'bdp_name' => '胸'],
            ['id' => 2, 'bdp_name' => '背中'],
            ['id' => 3, 'bdp_name' => '脚'],
            ['id' => 4, 'bdp_name' => '肩'],
            ['id' => 5, 'bdp_name' => '腕'],
            ['id' => 6, 'bdp_name' => 'お腹'],
            ['id' => 7, 'bdp_name' => 'その他'],
        ]);
    }
}