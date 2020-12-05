<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateThongtindonhangTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('thongtindonhang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shipping_id');
            $table->foreign('shipping_id')
                ->references('id')
                ->on('shippings');
            $table->unsignedBigInteger('lichsugiaodich_id');
            $table->foreign('lichsugiaodich_id')
                ->references('id')
                ->on('lichsugiaodich');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('thongtindonhang');
    }
}
