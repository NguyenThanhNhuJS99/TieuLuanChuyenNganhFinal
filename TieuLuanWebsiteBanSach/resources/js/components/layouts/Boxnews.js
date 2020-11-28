import React, { Component } from 'react';
import Slider from "react-slick";
class Boxnews extends Component {
    render() {
        const slick_banner = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
          };
        return (
            <div className="boxnews">
                    <div className="container">
                        <div className="boxtitle">
                            <hr/>
                            <div className="title">TIN TỨC <span>MỚI NHẤT</span></div>
                        </div>
                        <div className="listNews">
                            <div className="for_slick_slider multiple-items-news">
                                <Slider {...slick_banner}>
                                <div className="items">
                                    <div className="itemNews">
                                        <div className="imgNews">
                                            <img src="/images/imgNews01.png" alt=""/>
                                        </div>
                                        <p className="date">
                                            25 tháng 9, 2020
                                        </p>
                                        <h2>Bộ sưu tập sách mẹ và bé</h2>
                                        <p>Bạn vừa mới sinh con và đang thiếu kinh nghiệm để chăm sóc cho con mình thật
                                            tốt.
                                            Bộ sách sau đây là một lựa chọn tuyệt vời để bạn nâng cao kiến thức...</p>
                                    </div>
                                </div>
                                <div className="items">
                                    <div className="itemNews">
                                        <div className="imgNews">
                                            <img src="/images/imgNews02.png" alt=""/>
                                        </div>
                                        <p className="date">
                                            25 tháng 9, 2020
                                        </p>
                                        <h2>Bộ sưu tập sách mẹ và bé</h2>
                                        <p>Bạn vừa mới sinh con và đang thiếu kinh nghiệm để chăm sóc cho con mình thật
                                            tốt.
                                            Bộ sách sau đây là một lựa chọn tuyệt vời để bạn nâng cao kiến thức...</p>
                                    </div>
                                </div>
                                <div className="items">
                                    <div className="itemNews">
                                        <div className="imgNews">
                                            <img src="/images/imgNews03.png" alt=""/>
                                        </div>
                                        <p className="date">
                                            25 tháng 9, 2020
                                        </p>
                                        <h2>Bộ sưu tập sách mẹ và bé</h2>
                                        <p>Bạn vừa mới sinh con và đang thiếu kinh nghiệm để chăm sóc cho con mình thật
                                            tốt.
                                            Bộ sách sau đây là một lựa chọn tuyệt vời để bạn nâng cao kiến thức...</p>
                                    </div>
                                </div>
                                <div className="items">
                                    <div className="itemNews">
                                        <div className="imgNews">
                                            <img src="/images/imgNews01.png" alt=""/>
                                        </div>
                                        <p className="date">
                                            25 tháng 9, 2020
                                        </p>
                                        <h2>Bộ sưu tập sách mẹ và bé</h2>
                                        <p>Bạn vừa mới sinh con và đang thiếu kinh nghiệm để chăm sóc cho con mình thật
                                            tốt.
                                            Bộ sách sau đây là một lựa chọn tuyệt vời để bạn nâng cao kiến thức...</p>
                                    </div>
                                </div>
                                <div className="items">
                                    <div className="itemNews">
                                        <div className="imgNews">
                                            <img src="/images/imgNews02.png" alt=""/>
                                        </div>
                                        <p className="date">
                                            25 tháng 9, 2020
                                        </p>
                                        <h2>Bộ sưu tập sách mẹ và bé</h2>
                                        <p>Bạn vừa mới sinh con và đang thiếu kinh nghiệm để chăm sóc cho con mình thật
                                            tốt.
                                            Bộ sách sau đây là một lựa chọn tuyệt vời để bạn nâng cao kiến thức...</p>
                                    </div>
                                </div>
                                <div className="items">
                                    <div className="itemNews">
                                        <div className="imgNews">
                                            <img src="/images/imgNews03.png" alt=""/>
                                        </div>
                                        <p className="date">
                                            25 tháng 9, 2020
                                        </p>
                                        <h2>Bộ sưu tập sách mẹ và bé</h2>
                                        <p>Bạn vừa mới sinh con và đang thiếu kinh nghiệm để chăm sóc cho con mình thật
                                            tốt.
                                            Bộ sách sau đây là một lựa chọn tuyệt vời để bạn nâng cao kiến thức...</p>
                                    </div>
                                </div>
                                </Slider>
                            </div>
                            <div className="arrow-prev">
                            </div>
                            <div className="arrow-next">
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Boxnews;
