import React from "react";
import { FormGroup, FormLabel, FormControl, Form } from "react-bootstrap";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const s = "success";

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address1: '',
            province: '',
            phone: '',
            stateName: '',
            addressValidation: null,
            provinceValidation: null,
            phoneValidation: null,
            noteValidation: null,
        };
        this.handleAddressOneChange = this.handleAddressOneChange.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleNextAddress = this.handleNextAddress.bind(this);
    }

    handleAddressOneChange = (e) => {
        let address1 = e.target.value;
        let addressValidation = "success";
        if (address1.trim().length === 0) {
            addressValidation = "error";
        }
        if (address1.length <= 45) {
            this.setState(() => ({ address1, addressValidation }));
        }
        this.props.AddressOneChange(address1);
    };

    handleProvinceChange = (e) => {
        let province = e.target.value;
        let provinceValidation = "success";
        if (province.trim().length === 0) {
            provinceValidation = "error";
        }
        this.setState(() => ({ province, provinceValidation }));
        this.props.ProvinceOneChange(province);
    };

    handleStateChange = (e) => {
        let stateName = e.target.value;
        this.setState(() => ({ stateName }));
    };

    handlePhoneChange = (e) => {
        let phone = e.target.value.trim();
        let phoneValidation = null;
        if (phone.length < 10) {
            phoneValidation = "error"
        }
        else {
            phoneValidation = "success"
        }

        if (phone.length <= 10) {
            this.setState(() => ({ phone, phoneValidation }));
        }
        this.props.PhoneOneChange(phone);
    };

    handleNextAddress = () => {
        const { address1, province, stateName: state, phone } = this.state;
        const address = {
            address1,
            province,
            state,
            phone, 
        };
        this.props.handleNext(address);
    };

    render() {
        return (
            <form>
                <fieldset disabled={this.state.editDisabled}>
                    <FormGroup
                        controlId="formBasicAddress"
                        validationState={this.state.addressValidation}
                    >
                        <FormLabel>Điền thông tin địa chỉ</FormLabel>
                        <FormControl
                            type="text"
                            value={this.state.address1}
                            placeholder="Điền thông tin địa chỉ"
                            onChange={this.handleAddressOneChange}
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <Form.Group
                        controlId="formBasicprovince"
                        validationState={this.state.provinceValidation}
                    >
                        <Form.Label>Tỉnh thành</Form.Label>
                        <Form.Control as="select"
                            value={this.state.province}
                            name="Tỉnh thành"
                            onChange={this.handleProvinceChange}
                        >
                            <option>Chọn tỉnh thành</option>
                            <option value="1">An Giang</option>
                            <option value="2">Bà Rịa - Vũng Tàu</option>
                            <option value="3">Bắc Giang</option>
                            <option value="4">Bắc Kạn</option>
                            <option value="5">Bạc Liêu</option>
                            <option value="6">Bắc Ninh</option>
                            <option value="7">Bến Tre</option>
                            <option value="8">Bình Định</option>
                            <option value="9">Bình Dương</option>
                            <option value="10">Bình Phước</option>
                            <option value="11">Bình Thuận</option>
                            <option value="12">Cà Mau</option>
                            <option value="13">Cao Bằng</option>
                            <option value="14">Đắk Lắk</option>
                            <option value="15">Đắk Nông</option>
                            <option value="16">Điện Biên</option>
                            <option value="17">Đồng Nai</option>
                            <option value="18">Đồng Tháp</option>
                            <option value="19">Gia Lai</option>
                            <option value="20">Hà Giang</option>
                            <option value="21">Hà Nam</option>
                            <option value="22">Hà Tĩnh</option>
                            <option value="23">Hải Dương</option>
                            <option value="24">Hậu Giang</option>
                            <option value="25">Hòa Bình</option>
                            <option value="26">Hưng Yên</option>
                            <option value="27">Khánh Hòa</option>
                            <option value="28">Kiên Giang</option>
                            <option value="29">Kon Tum</option>
                            <option value="30">Lai Châu</option>
                            <option value="31">Lâm Đồng</option>
                            <option value="32">Lạng Sơn</option>
                            <option value="33">Lào Cai</option>
                            <option value="34">Long An</option>
                            <option value="35">Nam Định</option>
                            <option value="36">Nghệ An</option>
                            <option value="37">Ninh Bình</option>
                            <option value="38">Ninh Thuận</option>
                            <option value="39">Phú Thọ</option>
                            <option value="40">Quảng Bình</option>
                            <option value="41">Quảng Ngãi</option>
                            <option value="42">Quảng Ninh</option>
                            <option value="43">Quảng Trị</option>
                            <option value="44">Sóc Trăng</option>
                            <option value="45">Sơn La</option>
                            <option value="46">Tây Ninh</option>
                            <option value="47">Thái Bình</option>
                            <option value="48">Thái Nguyên</option>
                            <option value="49">Thanh Hóa</option>
                            <option value="50">Thừa Thiên Huế</option>
                            <option value="51">Tiền Giang</option>
                            <option value="52">Trà Vinh</option>
                            <option value="53">Tuyên Quang</option>
                            <option value="54">Vĩnh Long</option>
                            <option value="55">Vĩnh Phúc</option>
                            <option value="56">Yên Bái</option>
                            <option value="57">Phú Yên</option>
                            <option value="58">TP Cần Thơ</option>
                            <option value="59">TP Đà Nẵng</option>
                            <option value="60">TP Hải Phòng</option>
                            <option value="61">TP Hà Nội</option>
                            <option value="62">TP HCM</option>
                        </Form.Control>
                        <FormControl.Feedback />
                    </Form.Group>

                    <FormGroup
                        controlId="formBasicZip"
                        validationState={this.state.phoneValidation}
                    >
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl
                            type="number"
                            value={this.state.phone}
                            placeholder="Điền số điện thoại"
                            onChange={this.handlePhoneChange}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </fieldset>
                <div style={{ margin: '12px 0' }}>
                    <FlatButton
                        label="Quay lại"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.props.handlePrev}
                    />

                    <RaisedButton
                        label={'Tiếp tục'}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onClick={this.handleNextAddress}
                        style={{ marginRight: 12 }}
                    />

                </div>
            </form>
        )
    }
}
export default AddressForm;