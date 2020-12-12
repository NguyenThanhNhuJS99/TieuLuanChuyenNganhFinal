<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')
                ->references('id')
                ->on('customers');
            $table->string('name');
            $table->string('email');
            $table->integer('city');
            $table->integer('province');
            $table->integer('wards');
            $table->string('phone');
            $table->string('note');
            $table->string('paymentMethod');
            $table->integer('status')->default(0)->comment('0=>chờ xác nhận,  1=>chờ lấy hàng, 2=>đang giao, 3=>đã giao, 4=>đã hủy, 5=>trả hàng');
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
        Schema::dropIfExists('orders');
    }
}
