import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Navbar from "./Components/layout/Navbar"
import Dashboard from "./Components/dashboard/Dashboard"
import ResultDetails from "./Components/projects/ResultDetails"
import SignIn from "./Components/auth/SignIn"
import SignUp from "./Components/auth/SignUp"
import CreateSaledResult from "./Components/projects/CreateSaledResult"
import ResultAllTable from './Components/projects/ResultAllTable';
import CreateComment from "./Components/Comments/CreateComment";
import UserDetail from './Components/user/UserDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} /> 
          <Route exact path="/project/:role/:id" component={ResultDetails} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/create" component={CreateSaledResult} />
          <Route exact path="/projects/:shopName" component={ResultAllTable} />
          <Route exact path="/comment/:receiver/:saledResult" component={CreateComment} />
          <Route exact path="/users/:id" component={UserDetail} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
