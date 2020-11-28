import React, { Component } from 'react';

class Ranking extends Component {
    render() {
        return (
            <div>
                <div className="topBXH">
                    <div className="container">
                        <div className="titleBXH">BẢNG XẾP HẠNG</div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="itemTop demo" alt="Cá Voi Tỉ Đô" onclick="currentSlide(1)">
                                    <div className="row">
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                                            <div className="number">
                                                01 <br/>
                                                <i className="fas fa-arrow-up"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                            <div className="imgTop">
                                                <img src="/images/top01.jpg" alt="Cá Voi Tỉ Đô"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-7 col-sm-7 col-6">
                                            <div className="contentTop">
                                                <h3>Cá Voi Tỉ Đô</h3>
                                                <p>Tác giả: Bradley Hope, Tom Wright</p>
                                                <h4>4230 điểm</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="itemTop demo" alt="Muôn Kiếp Nhân Sinh" onclick="currentSlide(2)">
                                    <div className="row">
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                                            <div className="number">
                                                02 <br/>
                                                <i className="fas fa-arrow-down"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                            <div className="imgTop">
                                                <img src="/images/top02.jpg" alt="Muôn Kiếp Nhân Sinh"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-7 col-sm-7 col-6">
                                            <div className="contentTop">
                                                <h3>Muôn Kiếp Nhân Sinh</h3>
                                                <p>Tác giả: Nguyên Phong</p>
                                                <h4>3980 điểm</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="itemTop demo" alt="Hành Trình Về Phương Đông" onclick="currentSlide(3)">
                                    <div className="row">
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                                            <div className="number">
                                                03 <br/>
                                                <i className="fas fa-arrow-up"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                            <div className="imgTop">
                                                <img src="/images/top03.jpg" alt="Hành Trình Về Phương Đông"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-7 col-sm-7 col-6">
                                            <div className="contentTop">
                                                <h3>Hành Trình Về Phương Đông</h3>
                                                <p>Tác giả: Baird T.Spalding</p>
                                                <h4>3860 điểm</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="itemTop demo" alt="Cha Giàu Cha Nghèo" onclick="currentSlide(4)">
                                    <div className="row">
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                                            <div className="number">
                                                04 <br/>
                                                <i className="fas fa-arrow-up"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                            <div className="imgTop">
                                                <img src="/images/top04.jpg" alt="Cha Giàu Cha Nghèo"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-7 col-sm-7 col-6">
                                            <div className="contentTop">
                                                <h3>Cha Giàu Cha Nghèo</h3>
                                                <p>Tác giả: Robert Kiyosaki, Sharon Lechter</p>
                                                <h4>3530 điểm</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="itemTop demo" alt="Tôi Thấy Hoa Vàng Trên Cỏ Xanh" onclick="currentSlide(5)">
                                    <div className="row">
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                                            <div className="number">
                                                05 <br/>
                                                <i className="fas fa-arrow-down"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                            <div className="imgTop">
                                                <img src="/images/top05.jpg" alt="Tôi Thấy Hoa Vàng Trên Cỏ Xanh"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-7 col-sm-7 col-6">
                                            <div className="contentTop">
                                                <h3>Tôi Thấy Hoa Vàng Trên Cỏ Xanh</h3>
                                                <p>Tác giả: Nguyễn Nhật Ánh</p>
                                                <h4>3130 điểm</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 sanpham">
                                <div className="mySlides">
                                    <div className="boxImgTop">
                                        <img src="/images/top01.jpg"/>
                                    </div>
                                    <div className="contentPreview">
                                        <h3>Cá Voi Tỉ Đô</h3>
                                        <p><b> Tác giả: Bradley Hope, Tom Wright</b></p>
                                        <p><b>Nhà xuất bản: NXB Thế Giới</b></p>
                                        <h4 className="price">$20.50</h4>
                                        <p>
                                            Vào năm 2009, cựu sinh viên Trường Kinh doanh Wharton của Đại học
                                            Pennsylvania
                                            (Mỹ)
                                            Jho Low, với dáng vẻ “bầu bĩnh”, hiền lành đã khởi động chuỗi hành vi gian
                                            lận
                                            lớn
                                            chưa từng thấy - biểu tượng cho mối đe dọa lớn tiếp theo đối với hệ thống
                                            tài
                                            chính
                                            toàn cầu.
                                            Trong một thập kỷ, Low, với sự trợ giúp của ngân hàng Goldman Sachs (Mỹ) và
                                            nhiều
                                            nhân vật khác, đã rút ruột hàng tỷ đô la từ Quỹ đầu tư nhà nước Malaysia
                                            1MDB -
                                            ngay
                                            dưới mũi của các cơ quan giám sát ngành tài chính toàn cầu.
                                        </p>
                                        <button className="btnMuaNgay">MUA NGAY</button>
                                    </div>
                                </div>
                                <div className="mySlides">
                                    <div className="boxImgTop">
                                        <img src="/images/top02.jpg"/>
                                    </div>
                                    <div className="contentPreview">
                                        <h3>Muôn Kiếp Nhân Sinh</h3>
                                        <p><b> Tác giả: Nguyên Phong</b></p>
                                        <p><b>Nhà xuất bản: NXB Trẻ</b></p>
                                        <h4 className="price">$10.25</h4>
                                        <p>
                                            “Muôn kiếp nhân sinh” là tác phẩm do Giáo sư John Vũ - Nguyên Phong viết từ
                                            năm
                                            2017 và hoàn tất đầu năm 2020 ghi lại những câu chuyện, trải nghiệm tiền
                                            kiếp kỳ
                                            lạ từ nhiều kiếp sống của người bạn tâm giao lâu năm, ông Thomas – một nhà
                                            kinh
                                            doanh tài chính nổi tiếng ở New York. Những câu chuyện chưa từng tiết lộ này
                                            sẽ
                                            giúp mọi người trên thế giới chiêm nghiệm, khám phá các quy luật về luật
                                            Nhân
                                            quả và Luân hồi của vũ trụ giữa lúc trái đất đang gặp nhiều tai ương, biến
                                            động,
                                            khủng hoảng từng ngày.
                                        </p>
                                        <button className="btnMuaNgay">MUA NGAY</button>
                                    </div>
                                </div>
                                <div className="mySlides">
                                    <div className="boxImgTop">
                                        <img src="/images/top03.jpg"/>
                                    </div>
                                    <div className="contentPreview">
                                        <h3>Muôn Kiếp Nhân Sinh</h3>
                                        <p><b> Tác giả: Baird T. Spalding</b></p>
                                        <p><b>Nhà xuất bản: NXB Thế Giới</b></p>
                                        <h4 className="price">$9.15</h4>
                                        <p>
                                            “Hành trình về phương Đông” kể về những trải nghiệm của một đoàn khoa học
                                            gồm
                                            các
                                            chuyên gia hàng đầu của Hội Khoa Học Hoàng Gia Anh được cử sang Ấn Độ nghiên
                                            cứu
                                            về
                                            huyền học và những khả năng siêu nhiên của con người. Suốt hai năm trời rong
                                            ruổi
                                            khắp các đền chùa Ấn Độ, diện kiến nhiều pháp thuật, nhiều cảnh mê tín dị
                                            đoan,
                                            thậm
                                            chí lừa đảo…của nhiều pháp sư, đạo sĩ…họ được tiếp xúc với những vị chân tu
                                            thông
                                            thái sống ẩn dật ở thị trấn hay trên rặng Tuyết Sơn. Nhờ thế, họ được chứng
                                            kiến,
                                            trải nghiệm, hiểu biết sâu sắc về các khoa học cổ xưa và bí truyền của văn
                                            hóa
                                            Ấn Độ
                                            như yoga, thiền định, thuật chiêm tin, các phép dưỡng sinh và chữa bệnh,
                                            những
                                            kiến
                                            thức về nhân duyên, nghiệp báo, luật nhân quả, cõi sống và cõi chết…
                                        </p>
                                        <button className="btnMuaNgay">MUA NGAY</button>
                                    </div>
                                </div>
                                <div className="mySlides">
                                    <div className="boxImgTop">
                                        <img src="/images/top04.jpg"/>
                                    </div>
                                    <div className="contentPreview">
                                        <h3>Cha Giàu Cha Nghèo</h3>
                                        <p><b> Tác giả: Robert Kiyosaki, Sharon L.Lechter</b></p>
                                        <p><b>Nhà xuất bản: NXB Sư Phạm</b></p>
                                        <h4 className="price">$8.25</h4>
                                        <p>
                                            Bạn sẽ làm gì khi được cả hai người cha truyền dạy cho mình về chủ đề tiền
                                            bạc
                                            và sự
                                            lựa
                                            chọn cách sống trong đời. Một người là bố ruột, còn người kia là bố người
                                            bạn
                                            thân
                                            nhất.
                                            Một người có nền học vấn rất cao trong khi người kia chỉ học tới trung học,
                                            nhưng cả
                                            hai
                                            đều thành công trong sự nghiệp và có ảnh hưởng đến người khác.
                                        </p>
                                        <button className="btnMuaNgay">MUA NGAY</button>
                                    </div>
                                </div>
                                <div className="mySlides">
                                    <div className="boxImgTop">
                                        <img src="/images/top05.jpg"/>
                                    </div>
                                    <div className="contentPreview">
                                        <h3>Tôi Thấy Hoa Vàng Trên Cỏ Xanh</h3>
                                        <p><b> Tác giả: Nguyễn Nhật Ánh</b></p>
                                        <p><b>Nhà xuất bản: NXB Trẻ</b></p>
                                        <h4 className="price">$10.65</h4>
                                        <p>
                                            Một tác phẩm đình đám của Nguyễn Nhật Ánh được chuyển thể thành một thước
                                            phim
                                            hoàn
                                            hảo
                                            được cộng đồng mạng hết lời khen ngợi!

                                            Tuổi thơ trong truyện Nguyễn Nhật Ánh không giống như bây giờ, khi người ta
                                            có
                                            nhiều
                                            thứ
                                            để chơi và nhiều nơi để lựa chọn. Tuổi thơ trong truyện Nguyễn Nhật Ánh là
                                            khi
                                            bạn
                                            còn
                                            hòa mình với thiên nhiên, khi bạn thấy góc vườn nhà mình sao rộng đến lạ.
                                            Cái
                                            thú
                                            vui
                                            của những đứa trẻ nghèo vùng quê và tuổi thơ ấy được phát họa trong tác phẩm
                                            Tôi
                                            Thấy
                                            Hoa Vàng Trên Cỏ Xanh.
                                        </p>
                                        <button className="btnMuaNgay">MUA NGAY</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ranking;
