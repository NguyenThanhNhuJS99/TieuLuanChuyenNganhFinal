import Axios from "axios";
import Table from 'react-bootstrap/Table'
import React, { Component } from "react";
import { Alert, Button, Nav } from 'react-bootstrap';
import { PUBLIC_URL } from "../../constants";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux'

const CustomLink = ({ lable, to, activeOnlyOnExact }) => {
  return (
    <Route path={to} exact={activeOnlyOnExact} children={({ match }) => {
      var active = match ? 'hvr-float-shadow' : '';
      return (
        <li>
          <Link className={active} to={to} exact={activeOnlyOnExact}>{lable}</Link>
        </li>
      )
    }} />
  )
}
var itemsMenu = [
  {
    lable: 'Trang Chủ',
    to: '/shopbansach',
    exact: true
  },
  {
    lable: 'Cửa Hàng',
    to: '/store',
    exact: false
  },
  {
    lable: 'Tin Tức',
    to: '/shopbansach/news',
    exact: false
  },
  {
    lable: 'Giới Thiệu',
    to: '/shopbansach/about',
    exact: false
  },
  {
    lable: 'Liên Hệ',
    to: '/shopbansach/contact',
    exact: false
  },
  // {
  //   lable: 'Đăng nhập',
  //   to: '/shopbansach/login-checkout',
  //   exact: false
  // },
  // {
  //   lable: 'Đăng ký',
  //   to: '/shopbansach/register-checkout',
  //   exact: false
  // },
]

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartlist: [],
      idBookCart: '',
      totalCart: '',
      totalQuantity: '',
    };
    this.handleCart = this.handleCart.bind(this);
  }

  componentDidMount() {
    this.getCartDetails();
    this.getTotalCart();
    this.getTotalQuantity();
    this.tangSoLuongSach();
    this.giamSoLuongSach();
  }
  componentWillMount() {
    this.getCartDetails();
    this.getTotalCart();
    this.getTotalQuantity();
    this.tangSoLuongSach();
    this.giamSoLuongSach();
  }
  handleCart(e) {
    e.preventDefault();
    this.getTotalQuantity();
    this.getCartDetails();
    this.getTotalCart();
  }
  getCartDetails = () => {
    Axios.get('http://127.0.0.1:8000/cart').then((res) => {
      this.setState({
        cartlist: res.data,
      });
      console.log(this.props.products.cartlist);
    });
  };
  getTotalCart = () => {
    Axios.get('http://127.0.0.1:8000/totalCart').then((res) => {
      this.setState({
        totalCart: res.data,
      });
      console.log(this.props.products.totalCart);
    });
    
  }
  getTotalQuantity = () => {
    Axios.get('http://127.0.0.1:8000/totalQuantity').then((res) => {
      this.setState({
        totalQuantity: res.data,
      });
      console.log(this.props.products.total);
    });
    
  }
  tangSoLuongSach = async (id) => {
    Axios.put(`http://127.0.0.1:8000/tang-so-luong/${id}`)
      .then((res) => {
        console.log(res.data);
        this.getCartDetails();
      });
  };
  giamSoLuongSach = async (id) => {
    Axios.put(`http://127.0.0.1:8000/giam-so-luong/${id}`)
      .then((res) => {
        console.log(res.data);
        this.getCartDetails();
      });
  };
  deleteCart = async (id) => {
    Axios.delete(`http://127.0.0.1:8000/xoa-san-pham/${id}`)
      .then((res) => {
        console.log(res.data);
        this.getTotalQuantity();
        this.getCartDetails();
        this.getTotalCart();
      });
    
  };
  deleteAllCart = async () => {
    Axios.delete('http://127.0.0.1:8000/clear')
      .then((res) => {
        this.getTotalQuantity();
        this.getCartDetails();
        this.getTotalCart();
      });
  }
  getCartDetails = () => {
    Axios.get('http://127.0.0.1:8000/cart').then((res) => {
      this.setState({
        cartlist: res.data,
      });
      console.log('cartlist: ',this.props.products.cartlist);
    });
    
  };
  render() {
    console.log('check: ',this.props.products)
    const logout = () => {
      localStorage.removeItem("loginData");
      window.location.href = PUBLIC_URL + "login";
    };
    const logoutCus = () => {
      localStorage.removeItem("loginCustomerData");
      window.location.href = PUBLIC_URL + "login-checkout";
    };
    const getLoginCustomerData = localStorage.getItem("loginCustomerData");
    return (
      <header id="menu">
        <div id="top-menu" class="d-md-none d-sm-none d-none d-lg-block">
                <div class="container">
                    <div class="content-top-menu">
                        <p class="title-welcome">
                            Chào mừng bạn đến với thế giới cây cảnh
                        </p>
                        <div class="box-icon-top">
                          Đăng Nhập - Đăng Ký
                        </div>
                    </div>
                </div>
        </div>
        <div className="container">
          <div className="box-logo-search">
            <img className="imgLogoTop" src="/images/logo1.png" alt=""/>
            <div className="box-search-cart">
                <form className="search-box" action="aaaa">
                    <input className="input-search" type="text" placeholder="Tìm kiếm..."/>
                    <button type="submit" className="btn-search"><i className="fas fa-search"></i></button>
                </form>
                <a href="#" data-toggle="modal" data-target="#cart">
                    <div className="box-cart" ><i class="fas fa-shopping-cart"></i>
                        <span className="count">({this.props.products.total})</span><p>Sản phẩm</p>
                    </div>
                </a>
                      </div>
            <div class="menumobi d-lg-none d-md-block"> <a href="#my-menu" id="open" class="icon-menu">☰</a></div>
          </div>
        </div>
        {/* <div id="topmenu">
          <div className="container">
            <div className="row">
              <div className="menumobi mainmenu d-lg-none d-md-block"> <a href="#my-menu" id="open"
                className="icon-menu">☰</a>
              </div>
              <div className="col-6 col-sm-4 col-md-6 col-lg-6">
                <div className="box-logoTop">
                  <img src="/images/logo1.png" alt="" className="imgLogoTop"></img>
                </div>
              </div>
              {this.props.authData.isLoggedIn && (
                <Link to={`${PUBLIC_URL}categories`}>
                  <Nav.Item className="text-white mr-2">Thể loại sách</Nav.Item>
                </Link>
              )
              }
              <div className="col-3 col-sm-4 col-md-3 col-lg-3">
                <div className="box-search-cart">
                  <div className="row">
                    <div className="col-lg-10">
                      <div className="box-search d-md-none d-sm-none d-none d-lg-block">
                        <form className="form-search">
                          <input type="text" placeholder="Tìm kiếm..." name="search" />
                          <button className="btn-search" type="submit"><i
                            className="fas fa-search"></i></button>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="box-cart" data-toggle="modal" data-target="#cart">
                        <i className="fas fa-shopping-cart"></i>
                        <span className="total-count"> ({this.props.products.total})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3 col-sm-4 col-md-3 col-lg-3">
                {!this.props.authCusData.isCusLoggedIn && (
                  <>
                    <Link to={`${PUBLIC_URL}login-checkout`}>
                      <Nav.Item className="text-white mr-1 ">Đăng nhập</Nav.Item>
                    </Link>
                    <Link to={`${PUBLIC_URL}register-checkout`}>
                      <Nav.Item className="text-white mr-1 ">Đăng ký</Nav.Item>
                    </Link>
                  </>
                )}
                <Nav className="ml-auto">
                  {this.props.authData.isLoggedIn && (
                    <>
                      <Nav.Link>Xin chào Admin {this.props.authData.user.name}</Nav.Link>
                      <Nav.Link onClick={() => logout()}>
                        <Nav.Item className="text-dark mr-2 ">Đăng xuất</Nav.Item>
                      </Nav.Link>
                    </>
                  )}
                  {this.props.authCusData.isCusLoggedIn && (
                    <>
                      <Nav.Link>Xin chào {this.props.authCusData.customer.name}</Nav.Link>
                      <Nav.Link onClick={() => logoutCus()}>
                        <Nav.Item className="text-dark mr-2 ">Đăng xuất</Nav.Item>
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </div>
            </div>
          </div>
        </div> */}
        {/* Modal */}
        <form onSubmit={this.handleCart}>
          <div className="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Giỏ hàng</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                </div>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                    </tr>
                  </thead>
                  {Object.keys(this.props.products.cartlist).map((item, i) => (
                    <tbody>
                      <tr key={i}>
                        <td>{this.props.products.cartlist[item].name}</td>
                        <td>{this.props.products.cartlist[item].price}đ</td>
                        <td>
                          <div className="input-group" style={{ width: 130 + "px" }}>
                            <button
                              className="minus-item input-group-addon btn btn-primary"
                              onClick={() => this.giamSoLuongSach(this.props.products.cartlist[item].id)}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="item-count form-control"
                              disabled
                              value={this.props.products.cartlist[item].quantity}
                            />
                            <button
                              className="plus-item btn btn-primary input-group-addon"
                              onClick={() => this.tangSoLuongSach(this.props.products.cartlist[item].id)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td><Button
                          onClick={() => this.deleteCart(this.props.products.cartlist[item].id)}
                          className="btn btn-danger"
                        >
                          Xóa
                        </Button>
                        </td>
                      </tr>
                    </tbody>
                  ))
                  }
                </Table>
                {this.props.products.cartlist.length === 0 && (
                  <Alert variant={"warning"}>
                    Không có sản phẩm nào trong giỏ
                  </Alert>
                )}
                <div>Tổng tiền: {this.props.products.totalCart} VNĐ</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-info" data-dismiss="modal">Tiếp tục mua hàng</button>
                  <button
                    onClick={() => this.deleteAllCart()}
                    type="button"
                    className="btn btn-secondary"
                  >
                    Xóa hết
                  </button>
                  {this.props.products.cartlist.length !== 0 && (
                    <>
                      {getLoginCustomerData === null && (
                        <>
                          <Link to={`${PUBLIC_URL}login-checkout`}>
                            <Button>Thanh toán</Button>
                          </Link>
                        </>
                      )}
                      {getLoginCustomerData !== null && (
                        <>
                          <Link to={`${PUBLIC_URL}checkout`}>
                            <Button>Thanh toán</Button>
                          </Link>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="mainmenu d-none d-lg-block">
          <div className="container">
            <ul>
              {this.showMenu(itemsMenu)}
                <li class="main-sub">
                  <a href="">Thể loại <i class="fas fa-chevron-down"></i></a>
                  <ul class="sub-menu">
                      <li><a href="">Văn Học</a></li>
                      <li><a href="">Thiếu Nhi</a></li>
                      <li><a href="">Khoa Học</a></li>
                      <li><a href="">Truyện</a></li>
                  </ul>
                </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
  showMenu = (itemsMenu) => {
    var result = null;
    if (itemsMenu.length > 0) {
      result = itemsMenu.map((itemMenu, index) => {
        return <CustomLink lable={itemMenu.lable} to={itemMenu.to} activeOnlyOnExact={itemMenu.exact} />
      })
    }
    return result;
  }
}

const mapStateToProps = state =>{
  return {
      products: state.products
  }
}
const mapDispatchToProps = (dispatch, props) =>{
  return {
      onAddProduct : (total,cartlist,totalCart) =>{
          dispatch(actions.addProduct(total,cartlist,totalCart));
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);
