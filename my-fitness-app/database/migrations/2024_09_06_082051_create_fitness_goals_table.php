<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fitness_goals', function (Blueprint $table) {
            $table->id();
            $table->string('goal_key', 50)->unique();
            $table->string('goal_name', 50)->nullable(false); // NULLを許可しないように明示
            $table->text('description')->nullable(false); // descriptionにもNULLを許可しないように設定
            $table->timestamps();
        });

        DB::table('fitness_goals')->insert([
            ['goal_key' => 'weight_loss', 'goal_name' => '減量', 'description' => '体重を減らすことを目的としたフィットネスプログラム。'],
            ['goal_key' => 'muscle_gain', 'goal_name' => '筋肥大', 'description' => '筋肉の量を増やすことを目的としたフィットネスプログラム。'],
            ['goal_key' => 'strength_gain', 'goal_name' => '筋力向上', 'description' => '筋力を増強することを目的としたフィットネスプログラム。'],
            ['goal_key' => 'maintenance', 'goal_name' => '健康維持', 'description' => '現在の健康状態を維持することを目的としたフィットネスプログラム。'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fitness_goals');
    }
};
