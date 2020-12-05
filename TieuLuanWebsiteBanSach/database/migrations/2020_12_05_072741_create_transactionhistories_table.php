<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionhistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactionhistories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')
                ->references('id')
                ->on('customers');
            $table->boolean('order_status')->default(0)->comment('0=>chờ xác nhận,  1=>chờ lấy hàng, 2=>đang giao, 3=>đã giao, 4=>đã hủy, 5=>trả hàng');
            $table->string('item_name');
            $table->integer('item_quantity');
            $table->float('item_originalPrice');
            $table->float('item_price');
            $table->float('item_totalmoney');
            $table->string('item_image');
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
        Schema::dropIfExists('transactionhistories');
    }
}
