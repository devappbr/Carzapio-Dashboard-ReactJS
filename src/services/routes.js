import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Main from '../components/main';
import Header from '../components/header';
import Menu from '../components/menu';
import '../App.css'
import ListProduct from '../screens/products/';
import ListCarte from '../screens/carte';
import listCategories from '../screens/categories';
import listIngredients from '../screens/ingredients';
import SignUp from '../screens/signup'
import SignIn from '../screens/signin'

import { isAuthenticated } from "../services/auth";
import GroupIngredients from "../screens/groupIngredients";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/signup", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Fragment  key='fragment'>
        <Header />
        <div className="split">
          <Menu />
          <PrivateRoute path="/main" component={Main} />
          <PrivateRoute path="/products" component={ListProduct} />
          <PrivateRoute path="/carte" component={ListCarte} />
          <PrivateRoute path="/categories" component={listCategories} />
          <PrivateRoute path="/ingredients" component={listIngredients} />
          <PrivateRoute path="/groupingredients" component={GroupIngredients} />
        </div>
      </Fragment>
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </ BrowserRouter>
);

export default Routes;