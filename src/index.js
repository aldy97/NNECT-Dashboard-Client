import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin/Admin.js";
import Login from "./views/Login";
import UserProfile from "./views/UserProfile";
import ResetPassword from "./components/ResetPassword";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { Provider } from "react-redux";
import { configureStore } from "./reducers/index";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "antd/dist/antd.css";

export const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            <Route path="/login" render={(props) => <Login {...props}></Login>} />
            <Route
              path="/user-profile"
              exact
              component={() => {
                <UserProfile />;
              }}
            />
            <Route path="/resetPassword" render={() => <ResetPassword></ResetPassword>} />
            <Redirect from="/" to="/login" />
          </Switch>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  </Provider>,
  document.getElementById("root")
);
