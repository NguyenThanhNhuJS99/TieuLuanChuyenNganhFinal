import React, { Component } from 'react'
import { Card, Badge, Spinner, Image, Container, Row, Col, FormLabel, FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import ReactImageZoom from 'react-image-zoom';
import StarRatingComponent from 'react-star-ratings';
import { image } from "../../image";
import Axios from 'axios';

export default class Detail extends Component {
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
        this.changeActive = this.changeActive.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            let bookID = nextProps.match.params.id;
            this.getBookDetails(bookID);
        }
    }
    changeActive=(value)=>{
        this.setState({
            book: {
                image: value
            }
        })
        console.log("value",value)
        console.log("state",this.state.img.value)
    }
    componentWillMount() {
        this.changeActive('https://sachvui.com/cover/2015/toi-thay-hoa-vang-tren-co-xanh-nguyen-nhat-anh.jpg')
    };
    componentDidMount() {
        let bookID = this.props.match.params.id;
        this.getBookDetails();
        this.changeActive('https://sachvui.com/cover/2015/toi-thay-hoa-vang-tren-co-xanh-nguyen-nhat-anh.jpg')
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
                        <form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col lg={4} md={4}>
                                    <div className={"margin-div-five"}>
                                        <ReactImageZoom {...{
                                            width: 240,
                                            height: 300,
                                            zoomWidth: 200,
                                            img: this.state.book.image ? this.state.book.image : image,
                                            zoomStyle: 'z-index: 999;',
                                            zoomPosition: 'right: 10px'
                                        }} />
                                    </div>
                                    {/* <p className={"margin-div-five"}>Scroll over the image to zoom</p> */}
                                    <a onClick={()=>{this.changeActive('https://sachvui.com/cover/2015/toi-thay-hoa-vang-tren-co-xanh-nguyen-nhat-anh.jpg')}} className={this.state.book.image === 'https://sachvui.com/cover/2015/toi-thay-hoa-vang-tren-co-xanh-nguyen-nhat-anh.jpg' ? 'imgDetailMini active' : 'imgDetailMini'}>
                                        <img src='https://sachvui.com/cover/2015/toi-thay-hoa-vang-tren-co-xanh-nguyen-nhat-anh.jpg'></img>
                                    </a>
                                    <a onClick={()=>{this.changeActive('https://image.voso.vn/users/vosoimage/images/975ae71b64573550f3ed65ec6e7e5666?t%5B0%5D=compress%3Alevel%3D100&accessToken=a9d3eae7bd432980538df4485c8085f403e1a55af398aebbc8ea63b6e166896a')}} className={this.state.book.image === 'https://image.voso.vn/users/vosoimage/images/975ae71b64573550f3ed65ec6e7e5666?t%5B0%5D=compress%3Alevel%3D100&accessToken=a9d3eae7bd432980538df4485c8085f403e1a55af398aebbc8ea63b6e166896a' ? 'imgDetailMini active' : 'imgDetailMini'}>
                                        <img src='https://image.voso.vn/users/vosoimage/images/975ae71b64573550f3ed65ec6e7e5666?t%5B0%5D=compress%3Alevel%3D100&accessToken=a9d3eae7bd432980538df4485c8085f403e1a55af398aebbc8ea63b6e166896a'></img>
                                    </a>
                                </Col>

                                <Col lg={6} md={6}>
                                    <div className="contentPreview">
                                        <h3>Muôn Kiếp Nhân Sinh</h3>
                                        <p><b> Tác giả: Nguyên Phong</b></p>
                                        <p><b>Nhà xuất bản: NXB Trẻ</b></p>
                                        <h4 className="price"><span>150.000 VNĐ</span> - 125.000 VND</h4>
                                        <h5 className="save">Tiết kiệm được: 25.000 VNĐ</h5>
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
                                </Col>
                            </Row>
                        </form>                        
                    </div>
                </div>
            </>
        );
    }
}
