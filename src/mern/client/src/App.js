import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Switch } from "react-router-dom";

//component for the part
import CompanyProfileList from "./components/companyProfile/companyProfile";
import CreateCompanyProfile from "./components/companyProfile/createCompanyProfile";
import EditCompanyProfile from "./components/companyProfile/editCompanyProfile";
import MyCompanyProfile from "./components/companyProfile/myCompanyProfile";

const App = () => {
    return (
        //anything here needs to be a single element (aka a <div>)
        <div>
            <Route exact path="/">
                Main Page
            </Route>
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
    )
}

export default App