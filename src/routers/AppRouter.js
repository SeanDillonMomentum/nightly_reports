import React, { useState } from "react";
import { withRouter, BrowserRouter, Switch } from "react-router-dom";
import Home from "../containers/Home/Home";
import { authProvider } from "../Auth/authConfig";
import { AzureAD } from "react-aad-msal";
import Header from "../components/Header/Header";
import styled from "styled-components";
import SideNav from "../components/SideNav/SideNav";
import Login from "../components/Login";
import ViewData from "../containers/View/ViewData";
import Aggregation from "../containers/Aggregation/Aggregation";
import SubmitNightly from "../containers/SubmitNightly/SubmitNightly";
import SubmitSA from "../containers/SubmitSA/SubmitSA";
import AuthPage from "../containers/AuthPage/AuthPage";
import AdminView from "../containers/AdminView/AdminView";

const Context = React.createContext({});
const StyledApp = styled.div`
  margin-left: ${props => (props.show ? "100px" : "0")};
  transition: margin-left 0.5s;
  padding-top: 64px;
`;
export { Context };

const PrivateRoute = withRouter(props => {
  const { component: Component, show } = props;

  return (
    <AzureAD provider={authProvider}>
      {({ accountInfo }) => {
        return accountInfo && accountInfo.account ? (
          <>
            <Header accountInfo={accountInfo} />
            <SideNav accountInfo={accountInfo} />
            <StyledApp show={show}>
              <Component {...props} accountInfo={accountInfo} />
            </StyledApp>
          </>
        ) : (
          <Login login={() => authProvider.login()} />
        );
      }}
    </AzureAD>
  );
});

const AppRouter = () => {
  const [show, setShow] = useState(true);

  return (
    <Context.Provider value={{ show, setShow }}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute show={show} path="/" component={Home} exact={true} />
          <PrivateRoute
            show={show}
            path="/viewdata"
            component={ViewData}
            exact={true}
          />
          <PrivateRoute
            show={show}
            path="/aggregation"
            component={Aggregation}
            exact={true}
          />
          <PrivateRoute
            show={show}
            path="/submitim"
            component={SubmitNightly}
            exact={true}
          />
          <PrivateRoute
            show={show}
            path="/submitsa"
            component={SubmitSA}
            exact={true}
          />
          <PrivateRoute
            show={show}
            path="/auth"
            component={AuthPage}
            exact={true}
          />
          <PrivateRoute
            show={show}
            path="/adminview"
            component={AdminView}
            exact={true}
          />
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default AppRouter;
