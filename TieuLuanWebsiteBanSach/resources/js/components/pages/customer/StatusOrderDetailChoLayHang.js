import React, { Component } from 'react';

class StatusOrderDetailChoLayHang extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="stepper">
                <div className="stepper__step stepper__step--finish">
                    <div className="stepper__step-icon stepper__step-icon--finish">
                        <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="shopee-svg-icon icon-order-order">
                            <g>
                                <path d="m5 3.4v23.7c0 .4.3.7.7.7.2 0 .3 0 .3-.2.5-.4 1-.5 1.7-.5.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1s1.7.4 2.2 1.1c.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.7 0 1.2.2 1.7.5.2.2.3.2.3.2.3 0 .7-.4.7-.7v-23.7z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3">
                                </path>
                                <g>
                                    <line fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" x1="10" x2="22" y1="11.5" y2="11.5">
                                    </line>
                                    <line fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" x1="10" x2="22" y1="18.5" y2="18.5"></line>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="stepper__step-text">
                        Đơn hàng đã đặt
                    </div>
                </div>
                <div className="stepper__step stepper__step--finish">
                    <div className="stepper__step-icon stepper__step-icon--finish">
                        <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="shopee-svg-icon icon-order-paid">
                            <g>
                                <path clip-rule="evenodd" d="m24 22h-21c-.5 0-1-.5-1-1v-15c0-.6.5-1 1-1h21c .5 0 1 .4 1 1v15c0 .5-.5 1-1 1z" fill="none" fill-rule="evenodd" stroke-miterlimit="10" stroke-width="3">
                                </path>
                                <path clip-rule="evenodd" d="m24.8 10h4.2c.5 0 1 .4 1 1v15c0 .5-.5 1-1 1h-21c-.6 0-1-.4-1-1v-4" fill="none" fill-rule="evenodd" stroke-miterlimit="10" stroke-width="3"></path>
                                <path d="m12.9 17.2c-.7-.1-1.5-.4-2.1-.9l.8-1.2c.6.5 1.1.7 1.7.7.7 0 1-.3 1-.8 0-1.2-3.2-1.2-3.2-3.4 0-1.2.7-2 1.8-2.2v-1.3h1.2v1.2c.8.1 1.3.5 1.8 1l-.9 1c-.4-.4-.8-.6-1.3-.6-.6 0-.9.2-.9.8 0 1.1 3.2 1 3.2 3.3 0 1.2-.6 2-1.9 2.3v1.2h-1.2z" stroke="none"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="stepper__step-text">
                        đã xác nhận thông tin thanh toán
                    </div>
                </div>
                <div className="stepper__step stepper__step--finish">
                    <div className="stepper__step-icon-incomplete stepper__step-icon--finish">
                        <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="shopee-svg-icon icon-order-shipping">
                            <g>
                                <line fill="none" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" x1="18.1" x2="9.6" y1="20.5" y2="20.5"></line>
                                <circle cx="7.5" cy="23.5" fill="none" r="4" stroke-miterlimit="10" stroke-width="3"></circle>
                                <circle cx="20.5" cy="23.5" fill="none" r="4" stroke-miterlimit="10" stroke-width="3"></circle>
                                <line fill="none" stroke-miterlimit="10" stroke-width="3" x1="19.7" x2="30" y1="15.5" y2="15.5"></line>
                                <polyline fill="none" points="4.6 20.5 1.5 20.5 1.5 4.5 20.5 4.5 20.5 18.4" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polyline>
                                <polyline fill="none" points="20.5 9 29.5 9 30.5 22 24.7 22" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polyline>
                            </g>
                        </svg>
                    </div>
                    <div className="stepper__step-text">
                        Đã giao cho ĐVVC
                    </div>
                    
                </div>
                <div className="stepper__step stepper__step--finish">
                    <div className="stepper__step-icon-incomplete stepper__step-icon--finish">
                        <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="shopee-svg-icon icon-order-received">
                            <g>
                                <polygon fill="none" points="2 28 2 19.2 10.6 19.2 11.7 21.5 19.8 21.5 20.9 19.2 30 19.1 30 28" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polygon>
                                <polyline fill="none" points="21 8 27 8 30 19.1" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polyline>
                                <polyline fill="none" points="2 19.2 5 8 11 8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polyline>
                                <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" x1="16" x2="16" y1="4" y2="14"></line>
                                <path d="m20.1 13.4-3.6 3.6c-.3.3-.7.3-.9 0l-3.6-3.6c-.4-.4-.1-1.1.5-1.1h7.2c.5 0 .8.7.4 1.1z" stroke="none"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="stepper__step-text">
                        Đơn hàng đã nhận
                    </div>
                </div>
                <div className="stepper__step stepper__step--pending">
                    <div className="stepper__step-icon-incomplete stepper__step-icon--pending">
                        <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="shopee-svg-icon icon-order-rating">
                            <polygon fill="none" points="16 3.2 20.2 11.9 29.5 13 22.2 19 24.3 28.8 16 23.8 7.7 28.8 9.8 19 2.5 13 11.8 11.9" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polygon>
                        </svg>
                    </div>
                    <div className="stepper__step-text">
                        đánh giá
                    </div>
                    <div className="stepper__step-date">
                    </div>
                </div>
                <div className="stepper__line">
                    <div className="stepper__line-background" style={{background: 'rgb(' + 224 + ',' + 224 + ',' + 224 + ')'}}>
                    </div>
                    <div className="stepper__line-foreground" style={{width: 'calc((100% - 820px) * 1)', background: 'rgb(' + 45 + ',' + 194 + ',' + 88 + ')'}}>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatusOrderDetailChoLayHang;