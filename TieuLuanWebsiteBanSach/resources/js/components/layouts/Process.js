import React, { Component } from 'react';

class Process extends Component {
    render() {
        return (
            <div className="process">
                    <div className="container">
                        <hr/>
                        <h2 className="title">QUY TRÌNH TIẾP NHẬN VÀ THI CÔNG</h2>
                        <p className="introduce">Khi khách hàng có nhu cầu sử dụng dịch vụ thì đội ngũ tư vấn của CHÚNG TÔI sẽ đến
                            tận nơi của quý
                            khách
                            khảo sát tình hình và tư vấn để đưa ra các gói giá thích hợp cũng như giới thiệu cho quý khách những
                            hình thức ưu đãi của CHÚNG TÔI dành cho khách hàng của mình. Quý khách có thể tham khảo quy trình
                            tiếp
                            nhận và thi công của CHÚNG TÔI dưới đây</p>
                        <div className="timeline">
                            <ul>
                                <li>
                                    <div className="itemTimeline">
                                        <div className="row titleItemTimeline">
                                            <img className="col-lg-3 col-md-3 col-3" src="images/iconProcess01.png" alt=""/>
                                            <h3 className="col-lg-9 col-md-9 col-9">KHẢO SÁT CÔNG TRÌNH</h3>
                                        </div>
                                        <p>Gặp gỡ khách hàng, tiếp nhận ý kiến khách hàng, tiến hành khảo sát thực tế tỷ mỹ và
                                            ghi
                                            chú, đo vẽ hiện trạng (đối với công trình phức tạp).</p>
                                        <img className="imgLine" src="/images/imgTimeline01.png" alt=""/>
                                    </div>
                                </li>
                                <li>
                                    <div className="itemTimeline">
                                        <div className="row titleItemTimeline">
                                            <h3 className="col-lg-9 col-md-9 col-9">DỰ TOÁN BÁO GIÁ</h3>
                                            <img className="col-lg-3 col-md-3 col-3" src="images/iconProcess02.png" alt=""/>
                                        </div>
                                        <p>Thiết kế phương án thi công, bóc tách khối lượng, lập dự toán báo giá và thời gian
                                            thi công cho khách hàng.</p>
                                        <img className="imgLine" src="/images/imgTimeline02.png" alt=""/>
                                    </div>
                                </li>
                                <li>
                                    <div className="itemTimeline">
                                        <div className="row titleItemTimeline">
                                            <img className="col-lg-3 col-md-3 col-3" src="images/iconProcess03.png" alt=""/>
                                            <h3 className="col-lg-9 col-md-9 col-9">THẢO LUẬN VÀ KÍ HỢP ĐỒNG</h3>
                                        </div>
                                        <p>Chúng tôi sẽ cung cấp cho quý khách quy trình làm việc thực tế và thời gian hoàn
                                            thành chính xác. Nếu như khách hàng đồng ý thì sẽ tiến hành ký hợp đồng.</p>
                                        <img className="imgLine" src="/images/imgTimeline03.png" alt=""/>
                                    </div>
                                </li>
                                <li>
                                    <div className="itemTimeline">
                                        <div className="row titleItemTimeline">
                                            <h3 className="col-lg-9 col-md-9 col-9">THI CÔNG VÀ BÀN GIAO</h3>
                                            <img className="col-lg-3 col-md-3 col-3" src="images/iconProcess04.png" alt=""/>
                                        </div>
                                        <p>Sau khi cả hai đã thống nhất thì đội ngũ nhân viên của chúng tôi sẽ tiến hành nhiệm
                                            vụ của mình. Với trình độ chuyên môn cao, được đào tào bài bản và máy móc hiện đại
                                            đảm bảo khách hàng sẽ hài lòng khi sử dụng dịch vụ của chúng tôi</p>
                                        <img className="imgLine" src="/images/imgTimeline04.png" alt=""/>
                                    </div>
                                </li>
                                <li>
                                    <div className="itemTimeline">
                                        <div className="row titleItemTimeline">
                                            <img className="col-lg-3 col-md-3 col-3" src="images/iconProcess05.png" alt=""/>
                                            <h3 className="col-lg-9 col-md-9 col-9">THANH LÝ HỢP ĐỒNG</h3>
                                        </div>
                                        <p>Tiến hành nghiệm thu công trình, kí biên nhận và xuất phiếu bảo hành cho khách hàng.
                                        </p>
                                        <img className="imgLine" src="/images/imgTimeline05.png" alt=""/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Process;
