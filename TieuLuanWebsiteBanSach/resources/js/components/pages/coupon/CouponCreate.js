import React, { Component } from 'react';
import Axios from 'axios';
import SuccessAlert from '../../layouts/SuccessAlert';
import ErrorAlert from '../../layouts/ErrorAlert';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';
import { Row } from 'react-bootstrap';
export default class CouponCreate extends Component {

    constructor() {
        super();
        this.onChangeCouponName = this.onChangeCouponName.bind(this);
        this.onChangeCouponTime = this.onChangeCouponTime.bind(this);
        this.onChangeCouponNumber = this.onChangeCouponNumber.bind(this);
        this.onChangeCouponCode = this.onChangeCouponCode.bind(this);
        this.onChangeCouponCondition = this.onChangeCouponCondition.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            coupon_name: '',
            coupon_time: '',
            coupon_number: '',
            coupon_condition: '',
            coupon_code: '',
            alert_message: ''
        }
    }
    onChangeCouponName(e) {
        this.setState({
            coupon_name: e.target.value
        });
    }
    onChangeCouponTime(e) {
        this.setState({
            coupon_time: e.target.value
        });
    }
    onChangeCouponNumber(e) {
        this.setState({
            coupon_number: e.target.value
        });
    }
    onChangeCouponCode(e) {
        this.setState({
            coupon_code: e.target.value
        });
    }
    onChangeCouponCondition(e) {
        this.setState({
            coupon_condition: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const coupon = {
            coupon_name: this.state.coupon_name,
            coupon_time: this.state.coupon_time,
            coupon_number: this.state.coupon_number,
            coupon_code: this.state.coupon_code,
            coupon_condition: this.state.coupon_condition,
        }

        const response = Axios.post('http://127.0.0.1:8000/api/coupons', coupon)
            .then(res => {
                this.setState({ alert_message: "success" })
            }).catch(error => {
                this.setState({ alert_message: "error" });
            })
        if (response.success) {
            this.setState({
                coupon_name: "",
                coupon_time: "",
                coupon_number: "",
                coupon_condition: "",
                coupon_code: "",
            });
        } else {
            this.setState({
                errors: response.errors,
            });
        }
    }
    render() {
        return (
            <div>
                <hr />
                <div className="container">
                    <Row>
                        <div className="col-4">
                            <h2>Th??m M?? gi???m gi??</h2>
                        </div>
                        <div className="col-8">
                            <Link to={`${PUBLIC_URL}coupon`} className="btn btn-info">Xem danh s??ch m?? gi???m gi??</Link>
                        </div>
                    </Row>
                    {this.state.alert_message == "success" ? <SuccessAlert message={"Th??m th??nh c??ng m?? gi???m gi??!"} /> : null}
                    {this.state.alert_message == "error" ? <ErrorAlert message={"L???i x???y ra trong l??c th??m!"} /> : null}
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="coupon_name">T??n m?? gi???m gi??</label>
                            <input type="text" className="form-control"
                                id="coupon_name"
                                name="coupon_name"
                                value={this.state.coupon_name}
                                onChange={this.onChangeCouponName}
                                placeholder="Nh???p t??n m?? gi???m gi??" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="coupon_code">M?? gi???m gi??</label>
                            <input type="text" className="form-control"
                                id="coupon_code"
                                name="coupon_code"
                                value={this.state.coupon_code}
                                onChange={this.onChangeCouponCode}
                                placeholder="Nh???p m?? gi???m gi??" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="coupon_time">S??? l???n s??? d???ng</label>
                            <input type="number" className="form-control"
                                id="coupon_time"
                                name="coupon_time"
                                value={this.state.coupon_time}
                                onChange={this.onChangeCouponTime}
                                placeholder="Nh???p s??? l???n s??? d???ng" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="coupon_condition">T??nh n??ng m?? gi???m gi??</label>
                            <select
                                id="coupon_condition"
                                name="coupon_condition"
                                value={this.state.coupon_condition}
                                onChange={this.onChangeCouponCondition}
                                className="form-control">
                                <option>Ch???n t??nh n??ng m?? gi???m gi??</option>
                                <option value="1">Gi???m theo ph???n tr??m</option>
                                <option value="0">Gi???m theo s??? ti???n</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="coupon_number">S??? ph???n tr??m / S??? ti???n gi???m</label>
                            <input type="number" className="form-control"
                                id="coupon_number"
                                name="coupon_number"
                                value={this.state.coupon_number}
                                onChange={this.onChangeCouponNumber}
                                placeholder="Nh???p s??? ph???n tr??m / s??? ti???n gi???m" />
                        </div>
                        <button type="submit" className="btn btn-primary">Th??m m?? gi???m gi??</button>
                    </form>
                </div>
            </div>
        );
    }
}



