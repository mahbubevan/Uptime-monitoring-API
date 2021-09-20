import React from "react"
import Button from "./Button"

export default class LoginForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      phone:'',
      password:'',
      responseCode:200,
      error:{
        error:false
      },
      success:false,
      isAlerted:false      
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.inputChange = this.inputChange.bind(this)
  }

  inputChange(e){
    const target = e.target 
    const name = target.name 
    const value = target.value
    this.setState({
      [name]:value
    })
  }

  handleSubmit(e){
    e.preventDefault()

    const body = {
      phone:this.state.phone,
      password:this.state.password
    }

    const url = 'http://127.0.0.1:3000/token'
    fetch(url,{
      method:"POST",      
      body:JSON.stringify(body),
      headers:{
        'Content-Type':'text/plain',
        'Accept':'application/json'
      }
     
    })
    .then(result => {
      this.setState({
        responseCode:result.status
      }) 
      return result.text()
    })
    .then((data)=>{
      let dataObject = JSON.parse(data.toString())
      let expireDate = new Date(dataObject.expires).toUTCString()

      document.cookie =`tokenId=${dataObject.id};expires=${expireDate};path=/`
      this.props.onLoggedIn({isLoggedIn:true})

    }).catch(err=>console.log(err))

  }

  render(){
    return (
      <form className="row g-3" onSubmit={this.handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Phone</label>
          <input type="text" value={this.state.phone} name='phone' onChange={this.inputChange} className="form-control" 
          id="inputEmail4"/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Password</label>
          <input type="password" value={this.state.password} name='password' onChange={this.inputChange} className="form-control" id="inputPassword4"/>
        </div>
        <div className="col-12">
          <Button title="Login" btnStyle='btn btn-primary'/>
        </div>
      </form>
      )
  }
}
