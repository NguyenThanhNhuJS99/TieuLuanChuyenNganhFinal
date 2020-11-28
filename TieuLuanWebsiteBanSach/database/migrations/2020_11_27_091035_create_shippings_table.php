<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShippingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shippings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('address1');
            $table->boolean('province');
            //->comment(
            //     '1=>An Giang,  
            //      2=>Bà Rịa - Vũng Tàu,
            //      3=>Bắc Giang,
            //      4=>Bắc Kạn,
            //      5=>Bạc Liêu,
            //      6=>Bắc Ninh,
            //      7=>Bến Tre,
            //      8=>Bình Định,
            //      9=>Bình Dương,
            //      10=>Bình Phước,
            //      11=>Bình Thuận,
            //      12=>Cà Mau,
            //      13=>Cao Bằng,
            //      14=>Đắk Lắk,
            //      15=>Đắk Nông,
            //      16=>Điện Biên,
            //      17=>Đồng Nai,
            //      18=>Đồng Tháp,
            //      19=>Gia Lai,
            //      20=>Hà Giang,
            //      21=>Hà Nam,
            //      22=>Hà Tĩnh,
            //      23=>Hải Dương,
            //      24=>Hậu Giang,
            //      25=>Hòa Bình,
            //      26=>Hưng Yên,
            //      27=>Khánh Hòa,
            //      28=>Kiên Giang,
            //      29=>Kon Tum,
            //      30=>Lai Châu,
            //      31=>Lâm Đồng,
            //      32=>Lạng Sơn,
            //      33=>Lào Cai,
            //      34=>Long An,
            //      35=>Nam Định,
            //      36=>Nghệ An,
            //      37=>Ninh Bình,
            //      38=>Ninh Thuận,
            //      39=>Phú Thọ,
            //      40=>Quảng Bình,
            //      41=>Quảng Ngãi,
            //      42=>Quảng Ninh,
            //      43=>Quảng Trị,
            //      44=>Sóc Trăng,
            //      45=>Sơn La,
            //      46=>Tây Ninh,
            //      47=>Thái Bình,
            //      48=>Thái Nguyên,
            //      49=>Thanh Hóa,
            //      50=>Thừa Thiên Huế,
            //      51=>Tiền Giang,
            //      52=>Trà Vinh,
            //      53=>Tuyên Quang,
            //      54=>Vĩnh Long,
            //      55=>Vĩnh Phúc,
            //      56=>Yên Bái,
            //      57=>Phú Yên,
            //      58=>TP Cần Thơ,
            //      59=>TP Đà Nẵng,
            //      60=>TP Hải Phòng,
            //      61=>TP Hà Nội,
            //      62=>TP HCM'
            // );
            $table->string('phone');
            $table->string('note');
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
        Schema::dropIfExists('shippings');
    }
}
