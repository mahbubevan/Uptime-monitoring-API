import Landing from "./Component/Landing";
import {BrowserRouter as Router,Route,Link ,Switch} from 'react-router-dom'
import Register from "./Component/Register";
import Login from "./Component/Login";

import helpers from "./helpers"
import Navbar from "./Component/Navbar"

function App() {

  return (
    <div className="App">
       <Router>
       <Navbar sitename={helpers.getSiteName()}/> 
       <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
        </Router>      
    </div>
  );
}

export default App;
