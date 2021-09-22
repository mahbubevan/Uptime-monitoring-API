import Landing from "./Component/Landing";
import {BrowserRouter as Router,Route ,Switch,Redirect} from 'react-router-dom'
import Register from "./Component/Register";
import Login from "./Component/Login";
import UserDashboard from "./Component/AuthComponent/UserDashboard"

import helpers from "./helpers"
import Navbar from "./Component/Navbar"
import React from "react";

class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      isLoggedIn:false 
    }
    
    this.onLoggedInHandle = this.onLoggedInHandle.bind(this)    
    this.onLoggedOutHandle = this.onLoggedOutHandle.bind(this)    
  }

  onLoggedInHandle(obj){
    this.setState({
      isLoggedIn:obj.isLoggedIn
    })
  }

  onLoggedOutHandle(){
    this.setState({
      isLoggedIn:false
    })
  }

  componentDidMount()
  {
    const x = document.cookie
    const tokenId = x.split('=')[1]
    
    let url = `http://127.0.0.1:3000/token?id=${tokenId}`
    fetch(url).then(res=>res.json())
      .then(data=>{        
        let log = data.expires > Date.now() ? true : false 
        if (log) {
          this.setState({
            isLoggedIn:log
          })
        }
      })
      .catch(err=>console.log(err))
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Navbar loggedIn={this.state.isLoggedIn} logoutHandle={this.onLoggedOutHandle} sitename={helpers.getSiteName()}/>
          <Switch>
              <Route path='/dashboard'>                
                {
                  this.state.isLoggedIn ? <UserDashboard logoutHandle={this.onLoggedOutHandle}/> : <Redirect to="/login" />
                }
              </Route>              
              <Route path="/login">
                {
                  this.state.isLoggedIn ? <Redirect to="/dashboard" /> : <Login onLoggedIn={this.onLoggedInHandle} />
                }                
              </Route>
              <Route path="/register">
                { 
                  this.state.isLoggedIn ? <Redirect to="/dashboard" /> : <Register />
                }                
              </Route>          
              <Route path="/">
                <Landing />
              </Route>
          </Switch>
        </Router>      
      </div>
    );
  }
}

export default App;
