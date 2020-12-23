import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';
import { updateOrderStatus } from '../../../services/OrderService';
export default class OrderView extends Component {
    constructor() {
        super()
        this.state = {
            order: {},
            orderPrice: '',
            order_details: [],
            alert_message: '',
        }
    }
    componentDidMount() {
        Axios.get(`/api/view-order/${this.props.match.params.order_code}`)
            .then(response => {
                this.setState({
                    order: response.data.order,
                    order_details: response.data.order_details,
                });
            });
    }
    
    render() {
        return (
            <div>
                <hr />
                <h2>THÔNG TIN GIAO HÀNG</h2>
                <table className="table table-hover mt-2">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tỉnh/Thành phố</th>
                            <th scope="col">Quận/Huyện</th>
                            <th scope="col">Xã/Phường</th>
                            <th scope="col">Ghi chú</th>
                            <th scope="col">Hình thức thanh toán</th>
                            <th scope="col">Mã giảm giá</th>
                            <th scope="col">Phí vận chuyển</th>
                        </tr>
                    </thead>
                    {Object.keys(this.state.order).map(
                        (item, i) => (
                            <tbody>
                                <tr key={i}>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].id
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].city
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].province
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].wards
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].note
                                        }
                                    </td>
                                    <td>
                                        {this.state.order[item].paymentMethod === 1 && (
                                            <>
                                                Thanh toán trả trước
                                            </>
                                        )}
                                        {this.state.order[item].paymentMethod === 0 && (
                                            <>
                                                Thanh toán COD
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].coupon_code
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].feeship
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        )
                    )}
                </table>
                <h2 className="mt-5">THÔNG TIN SÁCH</h2>
                <table className="table table-hover mt-2">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID sách</th>
                            <th scope="col">Tên sách</th>
                            <th scope="col">Tổng giá sách</th>
                            <th scope="col">Số lượng mua</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.order_details.map(item => {
                                return (
                                    <tr key={item.order_details_id}>
                                        <th scope="row">{item.order_details_id}</th>
                                        <td>{item.product_id}</td>
                                        <td>{item.product_name}</td>
                                        <td>{item.product_price}</td>
                                        <td>{item.product_sales_quantity}</td>
                                    </tr>
                                )
                            })

                        }
                    </tbody>
                </table>
                <hr />
                <Link to={`${PUBLIC_URL}order`} className="btn btn-primary">
                    Danh sách đơn hàng
                </Link>
                
            </div>
        );
    }

}



