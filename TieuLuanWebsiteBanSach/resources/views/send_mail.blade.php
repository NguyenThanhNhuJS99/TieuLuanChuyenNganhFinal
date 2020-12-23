<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Đơn hàng Shop Bán Sách</title>
</head>
<body>
	<h1>Mail được gửi từ : {{ $name }}</h1>
	<h4>{{ $body }}</h4>
    <p>Xin chào {{ $full_name }},</p>
    <p>Quý khách đã đặt đơn hàng thành công. Đây là chi tiết về đơn hàng - </p>
    <p><strong>Thông tin giao hàng: </strong></p>
    <p>Mã đơn hàng: {{ $ordercode }}<br>
       Họ và tên: {{ $full_name }}<br>
       Địa chỉ giao hàng: {{ $address }}, {{ $wards }}, {{ $province }}, {{ $city }}<br>
       Phí vận chuyển: {{ $feeship }}VNĐ<br>
       Tổng tiền: {{ $total }}VNĐ
    </p>
    <p>Quý khách sẽ nhận được sản phẩm trong từ 2 đến 3 ngày</p>
    <p>Mọi thắc mắc có thể liên hệ chúng tôi qua số điện thoại: 0843339738</p>
	<p>Cảm ơn quý khách đã mua hàng từ cửa hàng chúng tôi. Hẹn gặp lại quý khách!</p>
</body>
</html>