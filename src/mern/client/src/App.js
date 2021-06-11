import React from "react";
import Registration from "./components/registration"
import Login from "./components/Login"
import Select from "./components/select"
import VideoPlayer from "./components/VideoPlayer"
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
			<Route path="/player" component={VideoPlayer}></Route>
      {/* <Route exact path="/roleselect/:info">
        <RoleSelection />
      </Route> */}
    </div>
  );
};

export default App;