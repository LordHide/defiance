<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBaseCharacterInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('base_character_info', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 25);
            $table->string('typeEs', 25);
            $table->string('typeEn', 25);
            $table->string('name_full', 35);
            $table->smallInteger('health');
            $table->smallInteger('Movement');
            $table->smallInteger('agro');
            $table->string('base_def');
            $table->foreignId("head_id");
            $table->foreignId("chest_id");
            $table->foreignId("arm1_id");
            $table->foreignId("arm2_id");
            $table->foreignId("extra1_id");
            $table->foreignId("extra2_id");
            $table->integer('colorPrimeR');
            $table->integer('colorPrimeG');
            $table->integer('colorPrimeB');
            $table->integer('colorSeconR');
            $table->integer('colorSeconG');
            $table->integer('colorSeconB');
            $table->foreignId("automedKit_id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('base_character_info');
    }
}
