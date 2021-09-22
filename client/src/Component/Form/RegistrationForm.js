import React from 'react'
import AlertComponent from './AlertComponent'
import { Link } from 'react-router-dom'

class RegistrationForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      firstName:'',
      lastName:'',
      phone:'',
      password:'',
      tosAgreement:false,
      responseCode:200,
      responseMsg:'',
      error:{
        error:false
      },
      success:false,
      isAlerted:false
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
      method:"POST",      
      body:JSON.stringify(body),
      headers:{
        'Content-Type':'text/plain',
        'Accept':'text/plain'
      }
     
    }).then((response)=>{
      if (response.status===200) {
        this.setState({
          success:true,
          error:{
            error:false,
          },
          responseCode:response.status,
          isAlerted:true
        })        
      }else{
        this.setState({
          error:{
            error:true,
          },
          responseCode:response.status,
          isAlerted:true
        })
      }
      return response.text()
    }).then((data)=>{
      let dataObject = JSON.parse(data.toString())
      this.setState({
        responseMsg:dataObject.message
      })
    })
    .catch(e=>console.log(e,"ERROR"))
  }

  render(){
    return (
      <main className='main-content mt-0'>
    <section className="min-vh-100 mb-8">
      <div className="page-header align-items-start min-vh-50 pt-5 pb-11 me-3 ms-3 mb-3 border-radius-lg">
        <span className="mask bg-gradient-primary opacity-6"></span>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 text-center mx-auto">
              <h1 className="text-white mb-2 mt-5">Welcome!</h1>
              <p className="text-lead text-white">Sign Up And Get Started</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
      <div className="row mt-lg-n10 mt-md-n11 mt-n10">
        <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div className="card z-index-0">
            <div className="card-header bg-white text-center pt-4">
              <h5>Sign Up</h5>
              {this.state.isAlerted ? <AlertComponent code={this.state.responseCode} msg={this.state.responseMsg} /> : null}
            </div>
            <div className="card-body">
              <form role="form text-left" onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <input type="text" name='firstName' onChange={this.handleInputChange} value={this.state.firstName} className="form-control" placeholder="First Name" aria-label="Name" aria-describedby="email-addon" />
                </div>
                <div className="mb-3">
                  <input type="text" name='lastName' onChange={this.handleInputChange} value={this.state.lastName} className="form-control" placeholder="Last Name" aria-label="Name" aria-describedby="email-addon" />
                </div>
                <div className="mb-3">
                  <input type="text" name='phone' onChange={this.handleInputChange} value={this.state.phone} className="form-control" placeholder="Phone" aria-label="Name" aria-describedby="email-addon" />
                </div>
                <div className="mb-3">
                  <input type="password" name='password' onChange={this.handleInputChange} value={this.state.password} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" />
                </div>
                <div className="form-check form-check-info text-left">
                  <input className="form-check-input" type="checkbox" onChange={this.handleInputChange} name='tosAgreement' value="" id="flexCheckDefault"/>
                  <label className="form-check-label" for="flexCheckDefault">
                    I agree the <a href="javascript:;" className="text-dark font-weight-bolder">Terms and Conditions</a>
                  </label>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">Sign up</button>
                </div>
                <p className="text-sm mt-3 mb-0">Already have an account? <Link to='/login' className="text-dark font-weight-bolder">Sign in</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
   </main>
      )
  }
}


export default RegistrationForm
