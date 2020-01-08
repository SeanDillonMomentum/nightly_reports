import React, { useState, useContext } from "react";
import { withRouter, BrowserRouter, Switch } from "react-router-dom";
import Home from "../containers/Home/Home";
import { authProvider } from "../Auth/authConfig";
import { AzureAD } from "react-aad-msal";
import Header from "../components/Header/Header";
import styled from "styled-components";
import SideNav from "../components/SideNav/SideNav";
import Login from "../components/Login";
import SubmitNightly from "../containers/SubmitNightly/SubmitNightly";
import SubmitSA from "../containers/SubmitSA/SubmitSA";
import AuthPage from "../containers/AuthPage/AuthPage";
import AdminView from "../containers/AdminView/AdminView";
import EditCrew from "../containers/EditCrew/EditCrew";
import EditTeam from "../containers/EditTeam/EditTeam";

const Context = React.createContext({});
const StyledApp = styled.div`
  margin-left: ${props => (props.show ? "100px" : "0")};
  transition: margin-left 0.5s;
  padding-top: 64px;
`;
export { Context };

const PrivateRoute = withRouter(props => {
  const { component: Component, show } = props;
  const { wasHome } = useContext(Context);
  return (
    <AzureAD provider={authProvider}>
      {({ accountInfo }) => {
        return accountInfo && accountInfo.account ? (
          <>
            <Header accountInfo={accountInfo} />
            <SideNav accountInfo={accountInfo} />
            <StyledApp show={show}>
              {!wasHome ? (
                <Home {...props} accountInfo={accountInfo} />
              ) : (
                <Component {...props} accountInfo={accountInfo} />
              )}
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
  const [wasHome, setWasHome] = useState(false);
  return (
    <Context.Provider value={{ show, setShow, wasHome, setWasHome }}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute show={show} path="/" component={Home} exact={true} />
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
          <PrivateRoute
            show={show}
            path="/editcrew"
            component={EditCrew}
            exact={true}
          />
          <PrivateRoute
            show={show}
            path="/editteams"
            component={EditTeam}
            exact={true}
          />
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default AppRouter;
