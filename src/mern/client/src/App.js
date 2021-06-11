import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Switch } from "react-router-dom";

//component for the part
import CompanyProfileList from "./components/companyProfile/companyProfile";
import CreateCompanyProfile from "./components/companyProfile/createCompanyProfile";
import EditCompanyProfile from "./components/companyProfile/editCompanyProfile";
import MyCompanyProfile from "./components/companyProfile/myCompanyProfile";

import Registration from "./components/registration"
import Login from "./components/Login"
import Select from "./components/select"
// import RoleSelection from "./components/roleSelection"

// import Navbar from "./components/navbar"

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";


const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Route exact path="/">
        <Select />
      </Route>
      <Route exact path="/signin">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Registration />
      </Route>
      {/* <Route exact path="/roleselect/:info">
        <RoleSelection />
      </Route> */}
      <Switch> 
        <Route path="/list"> 
            <CompanyProfileList />
        </Route>
        <Route path="/create">
          <CreateCompanyProfile />
        </Route>
        <Route path= "/view/:id" component={MyCompanyProfile} />
        <Route path="/edit/:id" component={EditCompanyProfile} />
      </Switch>

    </div>
  );
    }
export default App;

