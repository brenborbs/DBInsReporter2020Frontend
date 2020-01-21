import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

// Utilities
import ScrollToTop from "./hoc/ScrollToTop";

// Private & Admin Routes
import PrivateRoute from "./hoc/PrivateRoute";
import AdminRoute from "./hoc/AdminRoute";

// Pages
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import AddCategory from "./components/admin/AddCategory";
import AddReport from "./components/admin/AddReport";
import SearchReport from "./pages/Report";
import ReportDetail from "./pages/ReportDetail";
import ManageReports from "./components/admin/ManageReports";
import Profile from "./pages/Profile";
import UpdateReport from "./components/admin/UpdateReport";
import AllUsers from "./components/admin/Users";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/report" exact component={SearchReport} />
          <PrivateRoute
            path="/report/:reportId"
            exact
            component={ReportDetail}
          />
          <Route path="/signin" exact component={Signin} />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoute
            path="/admin/report/update/:reportId"
            exact
            component={UpdateReport}
          />
          <AdminRoute path="/create/category" exact component={AddCategory} />
          <AdminRoute path="/allUsers" exact component={AllUsers} />
          <PrivateRoute path="/create/report" exact component={AddReport} />
          <AdminRoute path="/signup" exact component={Signup} />
          <AdminRoute path="/admin/reports" exact component={ManageReports} />
          <PrivateRoute
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />
          <PrivateRoute path="/profile/:userId" exact component={Profile} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
