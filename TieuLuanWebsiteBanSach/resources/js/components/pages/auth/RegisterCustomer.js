import Axios from "axios";
import React from "react";
import { Card, Button, Spinner, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { registerCustomer } from "../../../services/CustomerAuthService";
class RegisterCheckout extends React.Component {

  state = {
    isloading: false,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    cities: [],
    address: '',
    city: '',
    province: '',
    wards: '',
    phone: '',
    phoneValidation: null,
    errors: {},

    validated: false,
  };

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
  };

  getCityDetails = () => {
    Axios.get('/api/delivery').then((res) => {
      this.setState({
        cities: res.data,
      });
    });
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAddressChange = (e) => {
    let address = e.target.value;
    this.setState(() => ({
        address,
    }));
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
  };

  submitForm = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({
      validated: true,
    });
    const { history } = this.props;
    const postBody = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      city: this.state.city,
      province: this.state.province,
      wards: this.state.wards,
      address: this.state.address,
      phone: this.state.phone
    };
    if (form.checkValidity() !== false) {
      e.preventDefault();
      this.setState({ isLoading: true });
      const response = await registerCustomer(postBody);
      console.log("response register", response);
      if (response.success) {
        this.setState({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          city: "",
          province: "",
          wards: "",
          address: "",
          phone: "",
          isLoading: false,
          errors: {},
        });
        localStorage.setItem("loginCustomerData", JSON.stringify(response));
        history.push(`${PUBLIC_URL}login-checkout`);
      } else {
        console.log("response.errors", response.errors);
        this.setState({
          errors: response.errors,
          isLoading: false,
        });
        localStorage.setItem("loginCustomerData", null);
      }
    }
  };

  render() {
    return (
      <div className="register-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="img-register">
                <img src="https://alexwebdevelop.com/wp-content/uploads/2019/08/php-login-and-authentication-the-definitive-guide.png"></img>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="header-part">
                <div className="text-center">
                  <h2>????ng k??</h2>
                </div>
                <div className="clearfix"></div>
              </div>
              <Card>
                <Card.Body>
                  <Form noValidate
                    validated={this.state.validated}
                    onSubmit={this.submitForm}
                  >
                    <div className="row">
                      <div className="col-12">
                        <Form.Group controlId="name">
                          <Form.Label>T??n ng?????i d??ng: </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Nh???p t??n"
                            value={this.state.name}
                            name="name"
                            onChange={(e) => this.changeInput(e)}
                          />
                          {this.state.errors && this.state.errors.name && (
                            <p className="text-danger">{this.state.errors.name[0]}</p>
                          )}
                          <Form.Control.Feedback type="invalid">
                            B???n ch??a nh???p t??n ng?????i d??ng.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group controlId="email">
                          <Form.Label>?????a ch??? Email: </Form.Label>
                          <Form.Control
                            required
                            type="email"
                            placeholder="Nh???p ?????a ch??? email"
                            value={this.state.email}
                            name="email"
                            onChange={(e) => this.changeInput(e)}
                          />
                          {this.state.errors && this.state.errors.email && (
                            <p className="text-danger">{this.state.errors.email[0]}</p>
                          )}
                          <Form.Control.Feedback type="invalid">
                            ?????a ch??? Email ch??a h???p l???.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <Form.Group controlId="password">
                          <Form.Label>M???t kh???u: </Form.Label>
                          <Form.Control
                            required
                            type="password"
                            placeholder="Nh???p m???t kh???u"
                            value={this.state.password}
                            name="password"
                            onChange={(e) => this.changeInput(e)}
                            minLength={8}
                          />
                          {this.state.errors && this.state.errors.password && (
                            <p className="text-danger">{this.state.errors.password[0]}</p>
                          )}
                          <Form.Control.Feedback type="invalid">
                            B???n ch??a nh???p m???t kh???u.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group controlId="password_confirmation">
                          <Form.Label>X??c nh???n m???t kh???u: </Form.Label>
                          <Form.Control
                            required
                            type="password"
                            placeholder="Nh???p l???i m???t kh???u"
                            value={this.state.password_confirmation}
                            name="password_confirmation"
                            onChange={(e) => this.changeInput(e)}
                            minLength={8}
                          />
                          {this.state.errors && this.state.errors.password_confirmation && (
                            <p className="text-danger">{this.state.errors.password_confirmation[0]}</p>
                          )}
                          <Form.Control.Feedback type="invalid">
                            B???n ch??a nh???p x??c nh???n m???t kh???u.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <Form.Group>
                          <Form.Label>Ch???n t???nh/th??nh ph???</Form.Label>
                          <Form.Control as="select"
                            value={this.state.city}
                            name="city"
                            id="city"
                            onChange={(e) => this.changeInput(e)}
                            className="choose city"
                          >
                            <option>Ch???n t???nh/th??nh ph???</option>
                            {this.state.cities.map((city, index) => (
                              <option key={index} value={city.matp}>{city.name_city}</option>
                            ))}
                          </Form.Control>
                          <FormControl.Feedback />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group>
                          <Form.Label>Ch???n qu???n huy???n</Form.Label>
                          <Form.Control as="select"
                            value={this.state.province}
                            name="province"
                            id="province"
                            onChange={(e) => this.changeInput(e)}
                            className="choose province"
                          >
                            <option>Ch???n qu???n huy???n</option>
                          </Form.Control>
                          <FormControl.Feedback />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group>
                          <Form.Label>Ch???n x?? ph?????ng</Form.Label>
                          <Form.Control as="select"
                            value={this.state.wards}
                            name="wards"
                            id="wards"
                            onChange={(e) => this.changeInput(e)}
                            className="wards"
                          >
                            <option>Ch???n x?? ph?????ng</option>
                          </Form.Control>
                          <FormControl.Feedback />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <FormGroup>
                          <FormLabel>??i???n ?????a ch??? nh??</FormLabel>
                          <FormControl
                            type="text"
                            value={this.state.address}
                            placeholder="??i???n ??i???n ?????a ch??? nh??"
                            onChange={this.handleAddressChange}
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <FormGroup>
                          <FormLabel>S??? ??i???n tho???i</FormLabel>
                          <FormControl
                            type="number"
                            value={this.state.phone}
                            placeholder="??i???n s??? ??i???n tho???i"
                            onChange={this.handlePhoneChange}
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                      </div>
                    </div>


                    {
                      this.state.isloading && (
                        <Button variant="info" type="button" disabled>
                          <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                          </Spinner>
                          ????ng k??...
                        </Button>
                      )
                    }
                    {
                      !this.state.isloading && (
                        <Button variant="info" type="submit">
                          ????ng k??
                        </Button>
                      )
                    }
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterCheckout);

