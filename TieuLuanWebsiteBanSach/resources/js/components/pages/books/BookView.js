import React, { Component } from 'react'
import { Card, Badge, Spinner, Image, Container, Row, Col, FormLabel, FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import ReactImageZoom from 'react-image-zoom';
import StarRatingComponent from 'react-star-ratings';
import { image } from "../../image";
import Axios from 'axios';

export default class BookView extends Component {
    constructor() {
        super();
        this.state = {
            book: {},
            qty: 1,
            img: '',
            id: '',
            isloading: false,
            productNotFound: false,
            snackbarMessage: "",
            autoHideDuration: 3000,
            snackbarOpen: false,
            numberOfRatings: 239,
            autoHideDuration: 3000,
        };
        this.qty = this.qty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            let bookID = nextProps.match.params.id;
            this.getBookDetails(bookID);
        }
    }

    componentDidMount() {
        let bookID = this.props.match.params.id;
        this.getBookDetails();
    };

    getBookDetails = () => {
        this.setState({ isloading: true });
        Axios.get(`http://127.0.0.1:8000/api/books/${this.props.match.params.id}`
        ).then((res) => {
            this.setState({
                book: res.data.data,
                isloading: false,
            });
        });
    }

    qty(id, e) {
        console.log(id);
        this.setState({ qty: e.target.value, id: id });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { history } = this.props;
        Axios.post('http://127.0.0.1:8000/add', {
            qty: this.state.qty,
            id: this.state.id
        })
            .then(res => {
                console.log(res.data);
            });
        history.replace('/cart');
    }

    onQuantityBlur = () => {
        if (this.state.qty.length === 0 || (this.state.qty.length > 0 && parseInt(this.state.qty) < 1)) {
            this.setState(() => ({ qty: 1 }))
        }
    };

    render() {
        return (
            <>
                <div className="detail">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-5">
                                    <div className="app-figure" id="zoom-fig">
                                        <a id="Zoom-1" className="MagicZoom" title="Muôn Kiếp Nhân Sinh" href="images/detail-01.jpg?h=1400"
                                            data-zoom-image-2x="images/detail-01.jpg?h=2800" data-image-2x="images/detail-01.jpg?h=800">
                                            <img src="images/detail-01.jpg?h=800 2x" alt="" />
                                        </a>
                                        <div className="selectors">
                                            <a data-zoom-id="Zoom-1" href="images/detail-01.jpg?h=1400"
                                                data-image="images/detail-01.jpg?h=400" data-zoom-image-2x="images/detail-01.jpg?h=2800"
                                                data-image-2x="images/detail-01.jpg?h=800"/>
                                                <img srcset="images/rsz_detail-01.jpg?h=120 2x" src="images/rsz_detail-01.jpg?h=60" />
                                                <a data-zoom-id="Zoom-1" href="images/detail-02.jpg?h=1400"
                                                    data-image="images/detail-02.jpg?h=400" data-zoom-image-2x="images/detail-02.jpg?h=2800"
                                                    data-image-2x="images/detail-02.jpg?h=800">
                                                    <img srcset="images/rsz_detail-02.jpg?h=120 2x" src="images/rsz_detail-02.jpg?h=60" />
                                                </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-7">
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
                                        <a href="#" data-name="Book Story 01" data-price="17" className="add-to-cart"><button
                                                className="btnMuaNgay">MUA NGAY</button></a>
                                    </div>
                                </div>
                            </div>
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#thongtin">THÔNG TIN SẢN PHẨM</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#binhluan">BÌNH LUẬN</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div id="thongtin" className="container tab-pane active"><br/>
                                    <h3>THÔNG TIN SẢN PHẨM</h3>
                                    <p><b>Nội dung: “Muôn kiếp nhân sinh”</b> là tác phẩm do Giáo sư John Vũ - Nguyên Phong viết từ
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
                                        khủng hoảng từng ngày.</p>
                                    <p><b>Bìa:</b> <i>Bìa gập</i></p>
                                    <p><b>Nhà xuất bản:</b> <i>First News</i></p>
                                    <p><b>Thể loại:</b> <i>Tôn giáo</i> </p>
                                </div>
                                <div id="binhluan" className="container tab-pane fade"><br/>
                                    <h3>BÌNH LUẬN</h3>
                                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat.</p>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                        totam rem aperiam.</p>
                                </div>
                            </div>
                        </div>
                    </div>                  
            </>
        );
    }
}
