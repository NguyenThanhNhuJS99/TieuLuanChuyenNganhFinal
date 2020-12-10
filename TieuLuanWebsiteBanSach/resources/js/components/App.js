// import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './layouts/Header';
import Footer from './layouts/Footer';
// Pages
import Home from './pages/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
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
import Detail from './pages/books/Detail';
import News from './pages/news/News';
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import myReducer from './reducers/index'
import { reduce } from 'lodash';
import { MapsLocalShipping } from 'material-ui/svg-icons';
import Shipping from './pages/checkout/Shipping';
import AddDelivery from './pages/delivery/AddDelivery';
const store = createStore(myReducer)
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
        // Accordion 
        var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
            });
        }

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
            <div className="boxApp">
                <Router>
                    <Header id="top"
                        authData={this.state}
                        authCusData={this.state}
                        cart={this.state.cart}
                    />
                    <div>
                        <div>
                            <Switch>
                                <Route path={`${PUBLIC_URL}contact`}
                                    exact={true}
                                    component={Contact}
                                />
                                <Route path={`${PUBLIC_URL}books/view/:id`}
                                    exact={true}
                                    component={Detail}
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
                                <Route path={`${PUBLIC_URL}news`}
                                    exact={true}
                                    component={News}
                                />
                                <Route path={`${PUBLIC_URL}about`}
                                    exact={true}
                                    component={About}
                                />
                                <Route path={`${PUBLIC_URL}contact`}
                                    exact={true}
                                    component={Contact}
                                />
                                <Route path={`${PUBLIC_URL}shipping`}
                                    exact={true}
                                    component={Shipping}
                                />
                                <Route path={`${PUBLIC_URL}delivery`}
                                    exact={true}
                                    component={AddDelivery}
                                />
                                <Route path={`${PUBLIC_URL}`}
                                    exact={true}
                                    component={Home}
                                />
                            </Switch>
                            <Footer></Footer>
                        </div>
                    </div>
                </Router>
                <a href="#top">
                    <div id="toTop" className="back-to-top"><i className="fas fa-angle-double-up"></i></div>
                </a>
            </div>

        );
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'));
}
