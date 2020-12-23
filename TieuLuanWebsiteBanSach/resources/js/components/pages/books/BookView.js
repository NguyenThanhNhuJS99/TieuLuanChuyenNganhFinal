import React, { Component } from 'react'
import { Card, Badge, Spinner, Image, Container, Row, Col, FormLabel, FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import ReactImageZoom from 'react-image-zoom';
import StarRatingComponent from 'react-star-ratings';
import { image } from "../../image";
import Axios from 'axios';
import { connect } from 'react-redux'
import * as actions from './../../actions/index'
class BookView extends Component {
    constructor() {
        super();
        this.state = {
            book: {},
            imageBook: '',
            qty: '',
            img: '',
            id: '',
            totalCart: '',
            totalQuantity: '',
            cartlist: [],
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
    changeActive = (value) => {
        this.setState({
            imageBook: value
        })
        console.log("value", value)
        console.log("state", this.state.img.value)
    }
    componentWillMount() {
        this.changeActive(this.state.book.image1)
    };
    componentDidMount() {
        let bookID = this.props.match.params.id;
        this.getBookDetails();
        this.changeActive(this.state.book.image1);
        this.getCartDetails();
        this.getTotalCart();
        this.getTotalQuantity();
    };

    getBookDetails = () => {
        this.setState({ isloading: true });
        Axios.get(`http://127.0.0.1:8000/api/books/${this.props.match.params.id}`
        ).then((res) => {
            this.setState({
                book: res.data.data,
                imageBook: res.data.data.image1,
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
        Axios.post('http://127.0.0.1:8000/add', {
            qty: this.state.qty,
            id: this.state.id
        })
            .then(res => {
                console.log(res.data);
                this.setState({
                    cartlist: res.data,
                });
                this.getTotalQuantity();
                this.getCartDetails();
                this.getTotalCart();
                this.props.temp(this.state.cartlist);
                localStorage.setItem("CartData", JSON.stringify(res));
            });
        this.props.onAddProduct(this.state.totalQuantity, this.state.cartlist, this.state.totalCart);
    }

    getTotalCart = () => {
        Axios.get('http://127.0.0.1:8000/totalCart').then((res) => {
            this.setState({
                totalCart: res.data,
            });
            this.props.onAddProduct(this.state.totalQuantity, this.state.cartlist, this.state.totalCart);
        });
        
    }
    getTotalQuantity = () => {
        Axios.get('http://127.0.0.1:8000/totalQuantity').then((res) => {
            this.setState({
                totalQuantity: res.data,
            });
            this.props.onAddProduct(this.state.totalQuantity, this.state.cartlist, this.state.totalCart);
        });
    }
    getCartDetails = () => {
        this.props.onAddProduct(this.state.totalQuantity, this.state.cartlist, this.state.totalCart);
        Axios.get('http://127.0.0.1:8000/cart').then((res) => {
            this.setState({
                cartlist: res.data,
            });
        });
    };

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
                                <Col sm={12} lg={4} md={5}>
                                    <div className={"margin-div-five"}>
                                        <ReactImageZoom {...{
                                            width: 240,
                                            height: 300,
                                            zoomWidth: 200,
                                            img: this.state.imageBook ? this.state.imageBook : image,
                                            zoomStyle: 'z-index: 999;',
                                            zoomPosition: 'right: 10px'
                                        }} />
                                    </div>
                                    {/* <p className={"margin-div-five"}>Scroll over the image to zoom</p> */}
                                    <a onClick={() => { this.changeActive(this.state.book.image1) }} className={this.state.imageBook === this.state.book.image1 ? 'imgDetailMini active' : 'imgDetailMini'}>
                                        <img src={this.state.book.image1}></img>
                                    </a>
                                    <a onClick={() => { this.changeActive(this.state.book.image2) }} className={this.state.imageBook === this.state.book.image2 ? 'imgDetailMini active' : 'imgDetailMini'}>
                                        <img src={this.state.book.image2}></img>
                                    </a>
                                </Col>

                                <Col sm={12} lg={6} md={6}>
                                    <div className="contentPreview">
                                        <h3>{this.state.book.name}</h3>
                                        <p><b>Tác giả: {this.state.book.author}</b></p>
                                        <p><b>Nhà xuất bản: NXB Trẻ</b></p>
                                        <h4 className="price"><span>{this.state.book.originalPrice}đ</span> - {this.state.book.price}đ</h4>
                                        <h5 className="save">Tiết kiệm được: {(this.state.book.originalPrice - this.state.book.price)}đ</h5>
                                        <p>
                                            {this.state.book.description}
                                        </p>
                                        <div className={"product-info-star-rating"}>
                                            {(this.state.book.ratings && this.state.book.ratings > 0) ?
                                                <div>
                                                    <StarRatingComponent
                                                        rating={this.state.book.ratings}
                                                        starDimension={"20px"}
                                                        starSpacing={"0px"}
                                                        starRatedColor={"rgb(247, 202, 37)"}
                                                    />
                                                </div>
                                                :
                                                <span className={"not-enough-ratings-span"}>Not enough ratings</span>
                                            }
                                        </div>
                                        <br></br>
                                        <FormGroup controlId="formQuantitySelect" className={"quantity-select"}>
                                            <FormLabel>Số lượng sách</FormLabel>
                                            <FormControl
                                                type="number"
                                                name="quantity"
                                                value={this.state.qty}
                                                onChange={(e) => this.qty(this.props.match.params.id, e)}
                                                onBlur={this.onQuantityBlur}
                                            />
                                        </FormGroup>
                                        <div>
                                            <span>
                                                <Button
                                                    type="submit"
                                                    bsstyle={"primary"}
                                                    className={"btn add-to-cart-product"}
                                                >Thêm vào giỏ
                                                </Button>
                                            </span>
                                        </div>
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
const mapStateToProps = state =>{
    return {

    }
}
const mapDispatchToProps = (dispatch, props) =>{
    return {
        onAddProduct : (total,cartlist,totalCart) =>{
            dispatch(actions.addProduct(total,cartlist,totalCart));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BookView);