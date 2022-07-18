import './App.css';
import Dashboard from "./components/Dashboard";
import Registration from "./components/Registration";
import Login from "./components/Login";
import ChangePassword from './components/ChangePassword'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyProfile from './components/MyProfile';
import DashboardAdmin from './components/DashboardAdmin';
import CustomerProfile from './components/CustomerProfile';

function App() {
  return (
    <div className="App">
    <Router>        
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Registration" component={Registration} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/ChangePassword" component={ChangePassword} />
          <Route exact path="/MyProfile" component={MyProfile} />
          <Route exact path="/DashboardAdmin" component={DashboardAdmin} />
          <Route exact path="/CustomerProfile" component={CustomerProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
