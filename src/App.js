import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./Login";
import LandingScreenforCheck from './Components/LandingScreenforCheck'
import ForgetPassword from "./ForgetPassword";
import OwnerLogin from "./OwnerLogin";
import LoginPage from "./LoginPage";
const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/ownerlogin" component={OwnerLogin} />
          <Route exact path="/home" component={LoginPage} />
          
          <Route exact path="/forget" component={ForgetPassword} />
          <LandingScreenforCheck />
        </Switch>

      </BrowserRouter>
    </>
  );
}

export default App;
