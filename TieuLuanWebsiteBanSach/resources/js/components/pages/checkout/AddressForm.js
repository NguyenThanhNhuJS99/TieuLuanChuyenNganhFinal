import React from "react";
import { FormGroup, FormLabel, FormControl, Form } from "react-bootstrap";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Axios from "axios";

const s = "success";

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            city: '',
            province: '',
            wards: '',
            phone: '',
            stateName: '',
            provinceValidation: null,
            phoneValidation: null,
            noteValidation: null,
            cityValidation: null,
            wardsValidation: null,
        };
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleNextAddress = this.handleNextAddress.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.handleWardsChange = this.handleWardsChange.bind(this);
    }

    componentDidMount() {
        this.getCityDetails();
        $('.choose').on('change', function () {
            var action = $(this).attr('id');
            var ma_id = $(this).val();
            var _token = $('input[name="_token"]').val();
            var result = '';

            if (action == 'city') {
                result = 'province';
            } else {
                result = 'wards';
            }
            $.ajax({
                url: '/api/select-delivery',
                method: 'POST',
                data: { action: action, ma_id: ma_id, _token: _token },
                success: function (data) {
                    $('#' + result).html(data);
                }
            });
        });
    }

    getCityDetails = () => {
        Axios.get('http://127.0.0.1:8000/api/delivery').then((res) => {
            this.setState({
                cities: res.data,
            });
            console.log(this.state.cities);
        });
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
        const { city, province, wards, stateName: state, phone } = this.state;
        const address = {
            city,
            province,
            wards,
            state,
            phone,
        };
        this.props.handleNext(address);
    };

    handleCityChange = (e) => {
        let cityValidation = "success";
        let city = e.target.value;
        this.setState(() => ({
            city,
            cityValidation
        }));
        this.props.CityOneChange(city);
    };

    handleProvinceChange = (e) => {
        let provinceValidation = "success";
        let province = e.target.value;
        this.setState(() => ({
            province,
            provinceValidation
        }));
        this.props.ProvinceOneChange(province);
    };

    handleWardsChange = (e) => {
        let wardsValidation = "success";
        let wards = e.target.value;
        this.setState(() => ({
            wards,
            wardsValidation
        }));
        this.props.WardsOneChange(wards);
    };

    render() {
        return (
            <form>
                <fieldset disabled={this.state.editDisabled}>
                    <Form.Group
                        controlId="formBasicprovince"
                        validationState={this.state.cityValidation}
                    >
                        <Form.Label>Chọn tỉnh/thành phố</Form.Label>
                        <Form.Control as="select"
                            value={this.state.city}
                            name="city"
                            id="city"
                            onChange={(e) => this.handleCityChange(e)}
                            className="choose city"
                        >
                            <option>Chọn tỉnh/thành phố</option>
                            {this.state.cities.map((city, index) => (
                                <option key={index} value={city.matp}>{city.name_city}</option>
                            ))}
                        </Form.Control>
                        <FormControl.Feedback />
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Chọn quận huyện</Form.Label>
                        <Form.Control as="select"
                            value={this.state.province}
                            name="province"
                            id="province"
                            onChange={this.handleProvinceChange}
                            className="choose province"
                        >
                            <option>Chọn quận huyện</option>
                        </Form.Control>
                        <FormControl.Feedback />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Chọn xã phường</Form.Label>
                        <Form.Control as="select"
                            value={this.state.wards}
                            name="wards"
                            id="wards"
                            onChange={this.handleWardsChange}
                            className="wards"
                        >
                            <option>Chọn xã phường</option>
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