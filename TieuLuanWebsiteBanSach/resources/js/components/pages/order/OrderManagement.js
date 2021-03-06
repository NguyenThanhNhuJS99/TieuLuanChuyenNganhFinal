import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { PUBLIC_URL } from '../../../constants';
import { updateOrderStatus } from '../../../services/OrderService';
import { InputGroup, FormControl } from 'react-bootstrap';
class OrderManagement extends Component {
    constructor() {
        super()
        this.state = {
            orders: [],
            searchOrderList: [],
            searchText: "",
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            alert_message: '',
            isloading: false,
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    componentDidMount() {
        this.getOrderLists();
    }
    getOrderLists = async () => {
        Axios.get('/api/manage-order')
            .then(response => {
                this.setState({
                    orders: response.data.data,
                    searchOrderList: response.data.data,
                    //Trong Postman
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
    };
    onSearchOrderList = (e) => {
        const searchText = e.target.value;
        this.setState({
            isloading: true,
        });
        if (searchText.length > 0) {
            const searchData = this.state.orders.filter(function (item) {
                const itemData = item.phone + " " + item.email + " " + item.order_code;
                const textData = searchText.trim().toLowerCase();
                return itemData.trim().toLowerCase().indexOf(textData) !== -1;
            })
            this.setState({
                searchOrderList: searchData,
                searchText: searchText,
                isloading: false,
            });
        } else {
            this.setState({
                searchText,
            });
            this.getOrderLists();
        }
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //this.setState({activePage: pageNumber});
        axios.get('/api/manage-order?page=' + pageNumber)
            .then(response => {
                this.setState({
                    orders: response.data.data,
                    //Trong Postman
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
    }
    onDelete(order_code) {
        Axios.delete('/api/order/delete/' + order_code)
            .then(response => {

                var orders = this.state.orders;

                for (var i = 0; i < orders.length; i++) {
                    if (orders[i].order_code == order_code) {
                        orders.splice(i, 1);
                        this.setState({ orders: orders });
                    }
                }
                this.setState({ alert_message: "success" })
            }).catch(error => {
                this.setState({ alert_message: "error" });
            })

    }

    toggleCompleteStatus = async (item) => {
        if (item.status === 0) {
            item.status = 1;
        } else if (item.status === 1) {
            item.status = 2;
        } else if (item.status === 2) {
            item.status = 3;
        } else if (item.status === 3) {
            item.status = 4;
        } else if (item.status === 4) {
            item.status = 5;
        }
        await updateOrderStatus(item.id, item);
        Axios.get('/api/manage-order')
            .then(response => {
                this.setState({
                    orders: response.data.data,
                    //Trong Postman
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
    };

    render() {
        return (
            <div>
                <hr />
                <div className="header-part row">
                    <div className="float-left">
                        <h2>Danh s??ch ????n h??ng</h2>
                    </div>
                    <div className="float-left text-center ml-5">
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="G?? ????? t??m ki???m..."
                                aria-label="G?? ????? t??m ki???m..."
                                aria-describedby="basic-addon2"
                                onChange={(e) => this.onSearchOrderList(e)}
                            />
                        </InputGroup>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">M?? ????n h??ng</th>
                            <th scope="col">T??n kh??ch h??ng</th>
                            <th scope="col">Email</th>
                            <th scope="col">S??? ??i???n tho???i</th>
                            <th scope="col">Th???i gian ?????t h??ng</th>
                            <th scope="col">T??nh tr???ng</th>
                            <th scope="col">T???ng ti???n</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orders.map(order => {
                                return (
                                    <tr key={order.id}>
                                        <td>{order.order_code}</td>
                                        <td>{order.name}</td>
                                        <td>{order.email}</td>
                                        <td>{order.phone}</td>
                                        <td>{order.created_at}</td>
                                        <td>
                                            {order.status === 0 && (
                                                <>
                                                    Ch??? x??c nh???n
                                                </>
                                            )}
                                            {order.status === 1 && (
                                                <>
                                                    Ch??? l???y h??ng
                                                </>
                                            )}
                                            {order.status === 2 && (
                                                <>
                                                    ??ang giao
                                                </>
                                            )}
                                            {order.status === 3 && (
                                                <>
                                                    ???? giao
                                                </>
                                            )}
                                            {order.status === 4 && (
                                                <>
                                                    ???? h???y
                                                </>
                                            )}
                                            {order.status === 5 && (
                                                <>
                                                    Tr??? h??ng
                                                </>
                                            )}
                                        </td>
                                        <td>{order.totalPrice}</td>
                                        <td>
                                            <Link to={`${PUBLIC_URL}order/view/${order.order_code}`} className="btn btn-outline-primary mr-2">
                                                Chi ti???t
                                            </Link>
                                            {order.status === 0 && (
                                                <>
                                                    <button
                                                        className="btn btn-outline-warning mr-2"
                                                        disabled
                                                        onClick={() => this.toggleCompleteStatus(order)}
                                                    >
                                                        Ch??? x??c nh???n
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 1 && (
                                                <>
                                                    <button
                                                        className="btn btn-outline-info mr-2"
                                                        disabled
                                                        onClick={() => this.toggleCompleteStatus(order)}
                                                    >
                                                        Ch??? l???y h??ng
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 2 && (
                                                <>
                                                    <button
                                                        className="btn btn-outline-secondary mr-2"
                                                        disabled
                                                        onClick={() => this.toggleCompleteStatus(order)}
                                                    >
                                                        ??ang giao
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 3 && (
                                                <>
                                                    <button
                                                        className="btn btn-outline-success mr-2"
                                                        disabled
                                                        onClick={() => this.toggleCompleteStatus(order)}
                                                    >
                                                        ???? giao
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 4 && (
                                                <>
                                                    <button
                                                        className="btn btn-outline-danger mr-2"
                                                        disabled
                                                        onClick={() => this.toggleCompleteStatus(order)}
                                                    >
                                                        ???? h???y
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 5 && (
                                                <>
                                                    <button
                                                        className="btn btn-outline-dark mr-2"
                                                        disabled
                                                        onClick={() => this.toggleCompleteStatus(order)}
                                                    >
                                                        Tr??? h??ng
                                                    </button>
                                                </>
                                            )}

                                            <a onClick={this.onDelete.bind(this, order.order_code)} className="btn btn-outline-danger mt-1">X??a</a>
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
            </div>
        );
    }

}

export default OrderManagement;

