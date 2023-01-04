<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

class CreateCharactersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 25);
            $table->string('type', 25);
            $table->string('nameFull', 35);
            $table->integer('colorPrimeR');
            $table->integer('colorPrimeG');
            $table->integer('colorPrimeB');
            $table->integer('colorSeconR');
            $table->integer('colorSeconG');
            $table->integer('colorSeconB');
            $table->foreignIdFor(User::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('characters');
    }
}
