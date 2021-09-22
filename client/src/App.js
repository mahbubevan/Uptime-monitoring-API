import Landing from "./Component/Landing";
import {BrowserRouter as Router,Route,Link ,Switch} from 'react-router-dom'
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
    let x = document.cookie
    let tokenId = x.split('=')[1]
    const url = `http://127.0.0.1:3000/token?id=${tokenId}`
    fetch(url,{method:'DELETE'})
    .then(res=>res.text())
    .then(data=>{     
      let pastDate = new Date(new Date().setDate(new Date().getDate() -1)).toUTCString()
      document.cookie =`tokenId=;expires=${pastDate};path=/`
      this.setState({
        isLoggedIn:false
      })
    }).catch(err=>console.log(err))
    
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
          <Navbar sitename={helpers.getSiteName()}/>
          <Switch>
              <Route path='/dashboard'>
                <UserDashboard />
              </Route>              
              <Route path="/login">
                <Login onLoggedIn={this.onLoggedInHandle} />
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
}

export default App;
