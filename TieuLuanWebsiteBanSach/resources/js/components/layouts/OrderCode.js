import React, { Component } from 'react';

class OrderCode extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="order-content__header">
                <div className="order-content__header__seller">
                    <div className="shopee-avatar">
                        <div className="shopee-avatar__placeholder">
                            <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="shopee-svg-icon icon-headshot">
                                <g>
                                    <circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle>
                                    <path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke-linecap="round" stroke-miterlimit="10"></path>
                                </g>
                            </svg>
                        </div>
                        <img className="shopee-avatar__img" src="/images/thumblogo.png" />
                    </div>
                    <span className="order-content__header__seller__name">
                        Mã đơn hàng: {this.props.order_code}
                    </span>
                </div>
                <div className="order-content__header__flex-placeholder">
                </div>
                <div className="order-content-status">
                    Đã giao
                </div>
            </div>
        );
    }
}

export default OrderCode;