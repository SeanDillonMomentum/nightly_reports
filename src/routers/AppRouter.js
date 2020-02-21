import React, { useState } from "react";
import { withRouter, BrowserRouter, Switch } from "react-router-dom";
import Home from "../containers/Home/Home";
import { authProvider } from "../Auth/authConfig";
import { AzureAD } from "react-aad-msal";
import Login from "../components/Login";
import SubmitNightly from "../containers/SubmitNightly/SubmitNightly";
import SubmitSA from "../containers/SubmitSA/SubmitSA";
import AuthPage from "../containers/AuthPage/AuthPage";
import AdminView from "../containers/AdminView/AdminView";
import EditCrew from "../containers/EditCrew/EditCrew";
import InstallManagers from "../containers/HandleInstallManagers/InstallManagers";
import EditTeams from "../containers/EditTeam/EditTeams";
import Wrapper from "../Wrapper";
const Context = React.createContext({});
export { Context };

const PrivateRoute = withRouter(props => {
  return (
    <AzureAD provider={authProvider}>
      {({ accountInfo }) => {
        return accountInfo && accountInfo.account ? (
          <Wrapper
            component={props.component}
            accountInfo={accountInfo}
            {...props}
          />
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
            component={EditTeams}
            exact={true}
          />
          <PrivateRoute
            show={show}
            path="/handleinstallmanagers"
            component={InstallManagers}
            exact={true}
          />
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default AppRouter;
