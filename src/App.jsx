import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import MainProfile from "./pages/MainProfile";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
// import Sidebar from "./components/Sidebar_Dashboad";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/category/:id" component={CategoryPage} />
        <ProtectedRoute exact path="/mainProfile/:id" component={MainProfile} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
