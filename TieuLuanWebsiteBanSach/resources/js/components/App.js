// import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Container } from 'react-bootstrap';
import $ from 'jquery';
// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CategoryList from './pages/categories/CategoryList';
import CategoryCreate from './pages/categories/CategoryCreate';
import CategoryView from './pages/categories/CategoryView';
import { PUBLIC_URL } from "../constants";
import BookEdit from './pages/books/BookEdit';
import BookView from './pages/books/BookView';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { checkIfAuthenticated } from '../services/AuthService';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import LoginCheckout from './pages/checkout/LoginCheckout';
import RegisterCheckout from './pages/checkout/RegisterCheckout';
import { checkCusIfAuthenticated } from '../services/CustomerAuthService';
import { checkCartItem } from '../services/CartService';
import CheckoutItem from './pages/checkout/CheckoutItem';
import CheckoutInformation from './pages/checkout/CheckoutInformation';
import ShowCheckout from './pages/checkout/ShowCheckout';
import NoCheckoutItems from './pages/checkout/NoCheckoutItems';
class App extends Component {
    state = {
        user: {},
        customer: {},
        isLoggedIn: false,
        isCusLoggedIn: false,
        cart:[],
    };
    buyItem=(value)=>{
        this.state.cart=value;
    }
    componentDidMount() {
        console.log("cart",this.state.cart);
        // window.onscroll = function () {
        //     scrollFunction();
        // };

        // var mybutton = document.getElementById("toTop");
        // var menutop = document.querySelector('#menu');
        // var banner = document.querySelector('.mainWeb');
        // var origOffsetY = banner.offsetTop;

        // function scrollFunction() {
        //     // Hiện menu sticky
        //     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        //         mybutton.style.display = "block";
        //     } else {
        //         mybutton.style.display = "none";
        //     }
        //     // Hiện menu sticky
        //     if (window.scrollY >= origOffsetY) {
        //         menutop.classList.add('sticky')
        //     } else {
        //         menutop.classList.remove('sticky');
        //     }
        // }
        // // Function  Back to top
        // $("a").on('click', function (event) {
        //     // Make sure this.hash has a value before overriding default behavior
        //     if (this.hash !== "") {
        //         // Prevent default anchor click behavior
        //         event.preventDefault();

        //         // Store hash
        //         var hash = this.hash;
        //         // Using jQuery's animate() method to add smooth page scroll
        //         // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        //         $('html, body').animate({
        //             scrollTop: $(hash).offset().top
        //         }, 800, function () {
        //             // Add hash (#) to URL when done scrolling (default click behavior)
        //             window.location.hash = hash;
        //         });
        //     } // End if
        // });

        // // Accordion 
        // var acc = document.getElementsByClassName("accordion");
        // var i;
        // for (i = 0; i < acc.length; i++) {
        //     acc[i].addEventListener("click", function () {
        //         this.classList.toggle("active");
        //         var panel = this.nextElementSibling;
        //         if (panel.style.maxHeight) {
        //             panel.style.maxHeight = null;
        //         } else {
        //             panel.style.maxHeight = panel.scrollHeight + "px";
        //         }
        //     });
        // }
        if (checkIfAuthenticated()) {
            this.setState({
                user: checkIfAuthenticated(),
                isLoggedIn: true,
            });
        }
        if (checkCusIfAuthenticated()) {
            this.setState({
                customer: checkCusIfAuthenticated(),
                isCusLoggedIn: true,
            });
        }
        if (checkCartItem()) {
            this.setState({
                cart: checkCartItem(),
            });
        }
    }
    render() {
        return (
            <div>
                <Router>
                    <Header
                        authData={this.state}
                        authCusData={this.state}
                        cart={this.state.cart}
                    />
                    <div>
                        <Container className="p-4">
                            <Switch>
                                <Route path={`${PUBLIC_URL}about`}
                                    exact={true}
                                    component={About}
                                />
                                <Route path={`${PUBLIC_URL}contact`}
                                    exact={true}
                                    component={Contact}
                                />
                                <Route path={`${PUBLIC_URL}books/view/:id`}
                                    exact={true}
                                    component={BookView}
                                />
                                <Route path={`${PUBLIC_URL}books/update/:id`}
                                    exact={true}
                                    component={BookEdit}
                                />
                                <Route path={`${PUBLIC_URL}categories/view/:id`}
                                    exact={true}
                                    authed={this.state.isLoggedIn}
                                    component={CategoryView}
                                />
                                <Route path={`${PUBLIC_URL}categories/create`}
                                    exact={true}
                                    authed={this.state.isLoggedIn}
                                    component={CategoryCreate}
                                />
                                <Route path={`${PUBLIC_URL}categories`}
                                    exact={true}
                                    authed={this.state.isLoggedIn}
                                    component={CategoryList}
                                />
                                <Route path={`${PUBLIC_URL}register`}
                                    exact={true}
                                    component={Register}
                                />
                                <Route path={`${PUBLIC_URL}login`}
                                    exact={true}
                                    component={Login}
                                />
                                <Route path={`${PUBLIC_URL}register-checkout`}
                                    exact={true}
                                    component={RegisterCheckout}
                                />
                                <Route path={`${PUBLIC_URL}login-checkout`}
                                    exact={true}
                                    component={LoginCheckout}
                                />
                                {/* <Route path={`${PUBLIC_URL}show-checkout`}
                                        exact={true}
                                        component={ShowCheckout}
                                    /> */}
                                <Route path={`${PUBLIC_URL}checkoutitem`}
                                    exact={true}
                                    component={CheckoutItem}
                                />
                                <Route path={`${PUBLIC_URL}checkoutinformation`}
                                    exact={true}
                                    component={CheckoutInformation}
                                />
                                <Route path={`${PUBLIC_URL}noitem`}
                                    exact={true}
                                    component={NoCheckoutItems}
                                />
                                <Route path={`${PUBLIC_URL}checkout`}
                                    exact={true}
                                    component={ShowCheckout}
                                />
                                <Route path={`${PUBLIC_URL}`}
                                    exact={true}
                                    component={Home}
                                />
                            </Switch>
                            <Footer></Footer>
                        </Container>
                    </div>
                </Router>
                <a href="#mainTop">
                    <div id="toTop" className="back-to-top"><i className="fas fa-angle-double-up"></i></div>
                </a>
            </div>

        );
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
