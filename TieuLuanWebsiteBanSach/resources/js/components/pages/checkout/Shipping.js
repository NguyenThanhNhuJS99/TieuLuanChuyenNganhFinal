import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Button, Spinner, Form } from 'react-bootstrap';
import { checkCusIfAuthenticated } from '../../../services/CustomerAuthService';
export default class Shipping extends Component {

    constructor() {
        super()
        this.state = {
            shipping_id: '',
            customer_id: '',
            isloading: false,
            orders: [],
            shippings: [],
            isCusLoggedIn: false,
            customer: {},
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            alert_message: ''
        }
        this.handlePageChange = this.handlePageChange.bind(this);

    }
    componentDidMount() {
        Axios.get('http://127.0.0.1:8000/api/shipping')
            .then(response => {
                this.setState({
                    shippings: response.data.data,
                    //Trong Postman
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
        if (checkCusIfAuthenticated()) {
            this.setState({
                customer: checkCusIfAuthenticated(),
                isCusLoggedIn: true,
            });
        }
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //this.setState({activePage: pageNumber});
        Axios.get('http://127.0.0.1:8000/api/shipping?page=' + pageNumber)
            .then(response => {
                this.setState({
                    shippings: response.data.data,
                    //Trong Postman
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
    }
    xacnhan(shippingid, customerid) {
        console.log("shipping id", shippingid);
        console.log("customer id", customerid);
        this.setState({ shippingid: shippingid, customerid: customerid });
    }
    handleAddToOrderTable = async (e) => {
        e.preventDefault();
        this.setState({ isloading: true })
        const postBody = {
            customer_id: this.state.customerid,
            shipping_id: this.state.shippingid,
        };
        const response = Axios.post('http://127.0.0.1:8000/api/order/store', postBody)
            .then((res) => {

            })
            .catch((error) => {
                console.log(error.res);
            });
        if (response.success) {
            this.setState({
                shippings: [],
                isloading: false,
            });
        } else {
            this.setState({
                errors: response.errors,
                isloading: false,
            });
        }
    }
    getOrderDetails = () => {
        Axios.get('http://127.0.0.1:8000/api/order')
            .then(response => {
                this.setState({
                    order: response.data.data,
                    // //Trong Postman
                    // itemsCountPerPage: response.data.per_page,
                    // totalItemsCount: response.data.total,
                    // activePage: response.data.current_page
                });
            });
    }
    getShippingDetails = () => {
        Axios.get('http://127.0.0.1:8000/api/shipping?page=' + pageNumber)
            .then(response => {
                this.setState({
                    shippings: response.data.data,
                    //Trong Postman
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
    }
    onDeleteShipping(id) {
        Axios.delete('http://127.0.0.1:8000/api/shipping/delete/' + id)
        .then(response => {

            var shippings = this.state.shippings;

            for (var i = 0; i < shippings.length; i++) {
                if (shippings[i].id == id) {
                    shippings.splice(i, 1);
                    this.setState({ shippings: shippings });
                }
            }
        }).catch(error => {

        })

    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleAddToOrderTable}>
                    <hr />
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID Khách hàng</th>
                                <th scope="col">ID Đơn hàng</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Email</th>
                                <th scope="col">Địa chỉ giao hàng</th>
                                <th scope="col">Tỉnh thành</th>
                                <th scope="col">Số điện thoại</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.shippings.map(shipping => {
                                    return (
                                        <tr key={shipping.id}>
                                            <th scope="row">{shipping.customer_id}</th>
                                            <th scope="row">{shipping.id}</th>
                                            <td>{shipping.name}</td>
                                            <td>{shipping.email}</td>
                                            <td>{shipping.address1}</td>
                                            <td>{shipping.province}</td>
                                            <td>{shipping.phone}</td>
                                            <td>
                                                {
                                                    this.state.isloading && (
                                                        <Button variant="primary" type="button" disabled>
                                                            <Spinner animation="border" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </Spinner>
                                                        Saving...
                                                        </Button>
                                                    )
                                                }
                                                {
                                                    !this.state.isloading && (
                                                        <Button
                                                            variant="outline-primary"
                                                            type="submit"
                                                            onClick={() => this.xacnhan(shipping.id, shipping.customer_id)}
                                                        >
                                                            Xác nhận đơn
                                                        </Button>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <Button
                                                    variant="outline-danger"
                                                    onClick={this.onDeleteShipping.bind(this, shipping.id)}
                                                >
                                                    Xóa
                                                </Button>                                              
                                            </td>
                                        </tr>
                                    )
                                })

                            }

                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={this.state.pageRangeDisplayed}
                            onChange={this.handlePageChange}
                            itemClass='page-item'
                            linkClass='page-link'
                        />
                    </div>
                </Form>
            </div>
        );
    }

}



