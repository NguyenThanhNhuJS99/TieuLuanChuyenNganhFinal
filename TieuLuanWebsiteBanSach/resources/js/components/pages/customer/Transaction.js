import React from 'react';
import Axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar'
class Transaction extends React.Component {
    state = {
        orders: [],
        order_details: [],
        cus_id: '',
    }
    componentWillMount() {
        const getLoginCustomerData = localStorage.getItem("loginCustomerData");
        if (getLoginCustomerData != null) {
            const customerdata = JSON.parse(getLoginCustomerData);
            if (customerdata.access_token !== null) {
                this.setState({
                    cus_id: customerdata.customer.id,
                });
            }
            else {
                console.log("Khách hàng chưa đăng nhập!");
            }
        }
    }
    componentDidMount() {
        Axios.get(`/api/customer-order/${this.state.cus_id}`)
            .then(response => {
                this.setState({
                    orders: response.data.order,
                });
            });
    }
    render() {
        return (
            this.state.orders.map(order => {
                return (
                    <>
                        {order.status === 0 && (
                            <>
                                <h5>Đơn hàng chờ xác nhận</h5>
                                <h6>Mã đơn hàng: {order.order_code}</h6>
                                <ProgressBar striped variant="warning" animated now={0} />
                            </>
                        )}
                        {order.status === 1 && (
                            <>
                                <h5>Đơn hàng chờ lấy hàng</h5>
                                <h6>Mã đơn hàng: {order.order_code}</h6>
                                <ProgressBar striped variant="info" animated now={45} />
                            </>
                        )}
                        {order.status === 2 && (
                            <>
                                <h5>Đơn hàng đang giao</h5>
                                <h6>Mã đơn hàng: {order.order_code}</h6>
                                <ProgressBar striped variant="secondary" animated now={70} />
                            </>
                        )}
                        {order.status === 3 && (
                            <>
                                <h5>Đơn hàng đã giao</h5>
                                <h6>Mã đơn hàng: {order.order_code}</h6>
                                <ProgressBar striped variant="success" animated now={100} />
                            </>
                        )}
                    </>
                )
            })
        );
    }
}

export default Transaction;