import React from "react"
import AlertComponent from './AlertComponent'
import { Link } from "react-router-dom"
import bg from './img/curved-10.jpg'

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
      if (this.state.responseCode === 200) {
        let dataObject = JSON.parse(data.toString())
        let expireDate = new Date(dataObject.expires).toUTCString()

        document.cookie =`tokenId=${dataObject.id};expires=${expireDate};path=/`
        this.props.onLoggedIn({isLoggedIn:true})
      }

    }).catch(err=>console.log(err))

  }

  render(){
    const styleSheet = {
      backgroundImage:`url(${bg})`
    }
    return (
      <main class="main-content  mt-0">
      <section>
        <div class="page-header min-vh-75">
          <div class="container">
            <div class="row">
              <div class="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div class="card card-plain mt-8">
                  <div class="card-header pb-0 text-left bg-transparent">
                    <h3 class="font-weight-bolder text-info text-gradient">Welcome back</h3>
                    <p class="mb-0">Enter your email and password to sign in</p>
                    {
                      this.state.responseCode !== 200 ? <AlertComponent code={this.state.responseCode} msg='Invalid'/> : null
                    }
                  </div>
                  <div class="card-body">
                    <form onSubmit={this.handleSubmit}>
                      <label>Phone</label>
                      <div class="mb-3">
                        <input type="phone" value={this.state.phone} name='phone' onChange={this.inputChange} class="form-control" placeholder="Phone" aria-label="Email" aria-describedby="email-addon" />
                      </div>
                      <label>Password</label>
                      <div class="mb-3">
                        <input type="password" value={this.state.password} name='password' onChange={this.inputChange} class="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" />
                      </div>
                      <div class="text-center">
                        <button type="submit" class="btn bg-gradient-info w-100 mt-4 mb-0">Sign in</button>
                      </div>
                    </form>
                  </div>
                  <div class="card-footer text-center pt-0 px-lg-2 px-1">
                    <p class="mb-4 text-sm mx-auto">
                      Don't have an account?
                      <Link to='/register' class="text-info text-gradient font-weight-bold">Sign up</Link>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                  <div class="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={styleSheet}></div>
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
