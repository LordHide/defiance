<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Skill;

class CreateSkillsAsociatedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skills_asociated', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignIdFor(Skill::class);
            $table->foreignId ("asociated_id");
            $table->string('type', 25);
            $table->string('asociated_type', 25);
            $table->smallInteger('group');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('skills_asociated');
    }
}
