<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInfoIconsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('infoIcons', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->enum('type', ['svg', 'text', 'png']);
            $table->string('code', 25);
            $table->string('class', 50);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('infoIcons');
    }
}
