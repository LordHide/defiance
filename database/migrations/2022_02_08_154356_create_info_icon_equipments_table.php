<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;
use App\Models\Equipment;
use App\Models\InfoIcon;

class CreateInfoIconEquipmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('info_icon_equipments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignIdFor(Equipment::class);
            $table->foreignIdFor(InfoIcon::class);
            $table->integer('orden');
            $table->string('positionIndicator', 50);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('info_icon_equipments');
    }
}
