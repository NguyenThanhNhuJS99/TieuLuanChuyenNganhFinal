import React from "react";
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col, FormGroup, FormLabel, FormControl, Radio, Form, Button, FormCheck, Spinner } from "react-bootstrap";
import AddressForm from "./AddressForm";
import Axios from "axios";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from "react-router-dom";

const FieldGroup = ({ id, label, validationState = null, ...props }) => (
    <FormGroup controlId={id} validationState={validationState}>
        <FormLabel>{label}</FormLabel>
        <FormControl {...props} />
        <FormControl.Feedback />
    </FormGroup>
);
const s = "success";
class CheckoutInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            cus_id: '',
            name: '',
            nameValidation: null,
            email: '',
            emailValidation: null,
            note: '',
            noteValidation: null,
            address1: '',
            province: '',
            phone: '',
            customer: {},
            isCusLoggedIn: false,
            loadedAddress: null,
            isLoading: false,
            url_one_pay: '',
            totalCart: '',
        };
    }
    getTotalCart = () => {
        Axios.get('http://127.0.0.1:8000/totalCart').then((res) => {
            this.setState({
                totalCart: res.data,
            });
            console.log(this.state.totalCart);
        });
    }
    componentDidMount() {
        this.getTotalCart();
        const getLoginCustomerData = localStorage.getItem("loginCustomerData");
        if (getLoginCustomerData != null) {
            const customerdata = JSON.parse(getLoginCustomerData);
            if (customerdata.success && customerdata.access_token !== null) {
                this.setState({
                    cus_id: customerdata.customer.id,
                    name: customerdata.customer.name,
                    email: customerdata.customer.email,
                    nameValidation: s,
                    emailValidation: s,
                });
            }
            else {
                console.log("Khách hàng chưa đăng nhập!");
            }
        }
    }
    deleteAllCart = async () => {
        Axios.delete('http://127.0.0.1:8000/clear')
          .then((res) => {
            this.getTotalQuantity();
            this.getCartDetails();
            this.getTotalCart();
          });
    }
    handleNext = async (address) => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
        if (stepIndex === 1) {
            this.setState(() => ({ loadedAddress: address }));
        }
        else if (stepIndex >= 2) {
            // process the order
            this.setState(() => ({ isLoading: true }));
            const totalAmount = this.state.totalCart;

            //const paymentMethod = this.state.creditCardChecked ? 'Credit Card' : 'Debit Card';
            const { history } = this.props;
            const postBody = {
                customer_id: this.state.cus_id,
                name: this.state.name,
                email: this.state.email,
                note: this.state.note,
                address1: this.state.address1,
                province: this.state.province,
                phone: this.state.phone,
                vpc_Merchant: 'ONEPAY',
                vpc_AccessCode: 'D67342C2',
                vpc_MerchTxnRef: '202012051903352146282783',
                vpc_OrderInfo: 'JSECURETEST01',
                vpc_Amount: '100',
                vpc_ReturnURL: 'http://127.0.0.1:8000/shopbansach/onepay',
                vpc_Version: '2',
                vpc_Locale: 'vn',
                vpc_Currency: 'VND',
                vpc_TicketNo: '::1',
                vpc_SHIP_Street01: '39A Ngo Quyen',
                vpc_SHIP_Provice: 'Hoan Kiem',
                vpc_SHIP_City: 'Ha Noi',
                vpc_SHIP_Country: 'Viet Nam',
                vpc_Customer_Phone: '840904280949',
                vpc_Customer_Email: 'support@onepay.vn',
                vpc_Customer_Id: 'thanhvt',
                virtualPaymentClientURL: 'https://mtf.onepay.vn/onecomm-pay/vpc.op',
                vpc_Command: 'pay',
                Title: 'VPC 3-Party'
            };

            const response = Axios.post("http://127.0.0.1:8000/api/shipping/store", postBody)
                .then((res) => {
                    // this.props.history.push({
                    //     pathname: '/shopbansach',
                    // });
                    window.location.href = res.data.url_one_pay;
                    console.log("onepay res", res);
                    //console.log("onepay success", res.success);
                    //console.log("onepay", res.success.url_one_pay);
                    this.deleteAllCart();
                })
                .catch((error) => {
                    console.log(error.res);
                });
            if (response.success) {
                this.setState({
                    cus_id: "",
                    name: "",
                    email: "",
                    note: "",
                    address1: "",
                    province: "",
                    phone: "",
                    paymentMethod: "",
                    isLoading: false,

                });

                
                
            } else {
                this.setState({
                    errors: response.errors,
                    isLoading: false,
                });
            }
        }
    };
    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };
    onNameChange = (e) => {
        let name = e.target.value;
        let nameValidation = "success";
        if (name.trim().length === 0) {
            nameValidation = "error";
        }
        if (name.length <= 45) {
            this.setState(() => ({ name, nameValidation }));
        }
    };
    static emailValidation = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    onEmailChange = (e) => {
        let email = e.target.value;
        let emailValidation = "error";
        if (CheckoutInformation.emailValidation(email.trim())) {
            emailValidation = "success";
        }

        if (email.length <= 45) {
            this.setState(() => ({ email, emailValidation }));
        }
    };
    onNoteChange = (e) => {
        let note = e.target.value;
        let noteValidation = "success";
        if (note.trim().length === 0) {
            noteValidation = "error";
        }
        if (note.length <= 45) {
            this.setState(() => ({ note, noteValidation }));
        }
    };
    onInputAddressChange = address1 => {
        this.setState({
            address1: address1
        });
    };
    onInputProvinceChange = province => {
        this.setState({
            province: province
        });
    };
    onInputPhoneChange = phone => {
        this.setState({
            phone: phone
        });
    };
    renderStepActions(step) {
        const { stepIndex } = this.state;

        return (
            <>
                <div style={{ margin: '12px 0' }}>
                    <RaisedButton
                        label={stepIndex === 2 ? 'Hoàn thành' : 'Tiếp tục'}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onClick={this.handleNext}
                        style={{ marginRight: 12 }}
                    />
                    {step > 0 && (
                        <FlatButton
                            label="Quay lại"
                            disabled={stepIndex === 0}
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            onClick={this.handlePrev}
                        />
                    )}
                </div>
            </>
        );
    }
    render() {
        const { stepIndex } = this.state;
        const totalAmount = this.state.totalCart;
        return (
            <div>
                <MuiThemeProvider>
                    <Stepper activeStep={stepIndex} orientation="vertical">
                        <Step>
                            <StepLabel>Thông tin người mua</StepLabel>
                            <StepContent>
                                <Row>
                                    <Col lg={12} md={12}>
                                        <form>
                                            <FieldGroup
                                                id="formControlsText"
                                                type="text"
                                                label="Họ và tên"
                                                validationState={this.state.nameValidation}
                                                placeholder="Điền họ và tên"
                                                value={this.state.name}
                                                onChange={this.onNameChange}
                                            />
                                            <FieldGroup
                                                id="formControlsEmail"
                                                type="email"
                                                label="Địa chỉ Email"
                                                validationState={this.state.emailValidation}
                                                placeholder="Enter email"
                                                value={this.state.email}
                                                onChange={this.onEmailChange}
                                            />
                                            <FieldGroup
                                                id="formControlsNote"
                                                type="text"
                                                label="Ghi chú"
                                                as="textarea"
                                                rows="3"
                                                validationState={this.state.noteValidation}
                                                placeholder="Ghi chú"
                                                value={this.state.note}
                                                onChange={this.onNoteChange}
                                            />
                                        </form>
                                    </Col>
                                </Row>
                                {this.state.nameValidation === "success" && this.state.emailValidation === "success" && this.renderStepActions(0)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Địa chỉ nhận hàng</StepLabel>
                            <StepContent>
                                <Row>
                                    <Col lg={12} md={12}>
                                        <AddressForm
                                            AddressOneChange={this.onInputAddressChange}
                                            ProvinceOneChange={this.onInputProvinceChange}
                                            PhoneOneChange={this.onInputPhoneChange}
                                            loadedAddress={this.state.loadedAddress}
                                            handleNext={this.handleNext}
                                            handlePrev={this.handlePrev}
                                        />
                                    </Col>
                                </Row>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Choose payment method</StepLabel>
                            <StepContent>
                                <Row>
                                    <Col lg={12} md={12}>
                                        {/* {this.props.authentication.isAuthenticated &&
                                        <Form onSubmit={this.onPromoCodeFormSubmit}>
                                            <FormGroup controlId={"promo-code-text"}>
                                                <FormLabel>Promo Code</FormLabel>
                                                <FormControl
                                                    type="text"
                                                    placeholder="Promo Code"
                                                    max={45}
                                                    name={"promo_code"}
                                                    className={"fifty-width"}
                                                    value={this.state.promoCode}
                                                    onChange={this.promoCodeChange}
                                                />
                                                {this.state.promoCodeError ?
                                                    <p className={"error-message"}>
                                                        {this.state.promoCodeMessage}
                                                    </p> :
                                                    <p className={"promo-successfully-applied"}>
                                                        {this.state.promoCodeMessage}
                                                    </p>
                                                }
                                                <Button
                                                    bsStyle={"primary"}
                                                    type={"submit"}
                                                    className={"star-rating-div btn-sm"}
                                                >
                                                    Apply
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                    } */}
                                        <FormGroup>
                                            <FormLabel>Payment Method</FormLabel>
                                            <p>Total Amount: ${totalAmount}</p>
                                            {/* {(typeof this.state.promoCodeResponse.promoCodeId !== 'undefined') &&
                                            <p>Discount applied: ${discount.toFixed(2)}</p>} */}
                                            {/* <p>Amount Due: ${amountDue}</p> */}
                                            <hr />
                                            <Button>
                                                Thanh toán trả trước
                                            </Button>
                                            <Form.Check name="radioGroup" value="2"
                                                onClick={this.handlePaymentMethod}
                                                checked={this.state.debitCardChecked}
                                                onChange={this.handlePaymentChange}
                                            >
                                                Debit Card
                                            </Form.Check>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {this.renderStepActions(2)}
                            </StepContent>
                        </Step>
                    </Stepper>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withRouter(CheckoutInformation);