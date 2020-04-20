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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} /> 
          <Route path="/project/:id" component={ResultDetails} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/create" component={CreateSaledResult} />
          <Route path="/projects/:shopName" component={ResultAllTable} />
          <Route path="/comment/:receiver/:saledResult" component={CreateComment} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
