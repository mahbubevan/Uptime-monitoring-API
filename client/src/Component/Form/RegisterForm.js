import React from 'react'
import Button from './Button'
class RegisterForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      firstName:'',
      lastName:'',
      phone:'',
      password:'',
      tosAgreement:false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event){
    const target = event.target 
    const value = target.type === 'checkbox' ? target.checked : target.value 
    const name = target.name 

    this.setState({
      [name]:value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    const body = {
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      phone:this.state.phone,
      password:this.state.password,
      tosAgreement:this.state.tosAgreement
    }

    const url = 'http://127.0.0.1:3000/user'
    fetch(url,{
      method:'POST',
      mode:'no-cors',
      body:JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'        
      },
    }).then(response=>{
      console.log(response);
    }).catch(e=>console.log(e))
  }

  render(){
    return (
      <form className="row g-3" onSubmit={this.handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">First Name</label>
          <input type="text" name='firstName' onChange={this.handleInputChange} value={this.state.firstName} className="form-control" id="inputEmail4"/>
        </div>
        <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">Last Name</label>
          <input type="text" name='lastName' onChange={this.handleInputChange} value={this.state.lastName} className="form-control" id="inputEmail4"/>
        </div>
        <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">Phone</label>
          <input type="text" name='phone' onChange={this.handleInputChange} value={this.state.phone} className="form-control" id="inputEmail4"/>
        </div>
        <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">Password</label>
          <input type="password" name='password' onChange={this.handleInputChange} value={this.state.password} className="form-control" id="inputEmail4"/>
        </div>
        <div className="col-md-12">
          <div class="form-check">
              <input class="form-check-input" onChange={this.handleInputChange} type="checkbox" name='tosAgreement' value="" id="flexCheckDefault" />
              <label class="form-check-label" for="flexCheckDefault">
                Agree ?
            </label>
          </div>
        </div>
        <div className="col-12">
          <Button title="Sign Up Now" btnStyle='btn btn-success'/>
        </div>
      </form>
      )
  }
}


export default RegisterForm
