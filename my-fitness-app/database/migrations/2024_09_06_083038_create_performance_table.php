<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('performance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('excs_id')->constrained('exercise')->onDelete('cascade'); // テーブル名を複数形に修正
            $table->integer('weight_count')->nullable();
            $table->integer('set_count')->nullable();
            $table->integer('rep_count')->nullable();
            $table->integer('duration')->nullable();
            $table->date('pfmc_date')->nullable();
            $table->boolean('delete_flg')->default(0);
            $table->timestamps(); // タイムスタンプを追加
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('performance'); // テーブル名を複数形に修正
    }
};