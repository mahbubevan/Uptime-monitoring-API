import React from 'react'
import AlertComponent from './AlertComponent'
import Button from './Button'

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
    <section className="min-vh-100 mb-8">
    <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg">
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 text-center mx-auto">
            <h1 className="text-white mb-2 mt-5">Welcome!</h1>
            <p className="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row mt-lg-n10 mt-md-n11 mt-n10">
        <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div className="card z-index-0">
            <div className="card-header bg-white text-center pt-4">
              <h5>Register with</h5>
            </div>
            <div className="card-body">
              <form role="form text-left">
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="email-addon" />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon" />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" />
                </div>
                <div className="form-check form-check-info text-left">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                  <label className="form-check-label" for="flexCheckDefault">
                    I agree the <a href="javascript:;" className="text-dark font-weight-bolder">Terms and Conditions</a>
                  </label>
                </div>
                <div className="text-center">
                  <button type="button" className="btn bg-gradient-dark w-100 my-4 mb-2">Sign up</button>
                </div>
                <p className="text-sm mt-3 mb-0">Already have an account? <a href="javascript:;" className="text-dark font-weight-bolder">Sign in</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
      )
  }
}


export default RegistrationForm
