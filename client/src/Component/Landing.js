import React from "react"
import UserDashboard from "./AuthComponent/UserDashboard"
import Login from "./Login"
import Register from "./Register"

class Landing extends React.Component
{
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
      console.log(data);      
      let pastDate = new Date(new Date().setDate(new Date().getDate() -1)).toUTCString()
      document.cookie =`tokenId=;expires=${pastDate};path=/`
      this.setState({
        isLoggedIn:false
      })
    }).catch(err=>console.log(err))
    
  }

  componentDidMount()
  {
    let x = document.cookie
    let tokenId = x.split('=')[1]
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

  componentWillUnmount()
  {
    
  }

  render(){   
     
    return(
      <div>
        {
        this.state.isLoggedIn ? <UserDashboard onLoggedOut={this.onLoggedOutHandle}/> : <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-12 text-center'>
            <h4> Register if you are new. Otherwise Login </h4>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-md-6'>
            <Register />
          </div>
          <div className='col-md-6'>
            <Login onLoggedIn={this.onLoggedInHandle} />
          </div>
        </div>
    </div>
      }
      </div>
    )
  }
}

export default Landing
