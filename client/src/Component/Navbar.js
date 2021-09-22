import React from 'react'
import {Link} from 'react-router-dom'
import helpers from '../helpers'

export default class Navbar extends React.Component{
  constructor(props){
    super(props)
    
    this.state = {
      isLoggedIn:this.props.isLoggedIn,
      redirect:false      
    }
    this.onLoggedOutHandle = this.onLoggedOutHandle.bind(this)
  }

  async componentDidMount()
  {
    const isTokenValid = await helpers.tokenVerify()
    if (isTokenValid) {
      this.setState({
        isLoggedIn:true
      })
    }else{
      this.setState({
        isLoggedIn:false
      })
    }
  }

  async componentDidUpdate()
  {
    const isTokenValid = await helpers.tokenVerify()
    if (isTokenValid) {
      this.setState({
        isLoggedIn:true
      })
    }else{
      this.setState({
        isLoggedIn:false
      })
    }
  }

  async componentWillUnmount()
  {
    const logoutConfirm = await helpers.loggedOut()
    if (logoutConfirm) {
      this.setState({
        isLoggedIn:false
      })
    }
  }

  async onLoggedOutHandle(){
    const logoutConfirm = await helpers.loggedOut()
    if (logoutConfirm) {
      this.setState({
        isLoggedIn:false
      })
    }

    this.props.logoutHandle()
  }

  render()
  {
    return (
      <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg  blur blur-rounded top-0 z-index-fixed shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
              <div className="container-fluid">
                <Link to='/' className="navbar-brand font-weight-bolder ms-sm-3">
                  {this.props.sitename}
                </Link>
                <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon mt-2">
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </span>
                </button>
                <div className="collapse navbar-collapse pt-3 pb-2 py-lg-0 w-100" id="navigation">
                  <ul className="navbar-nav navbar-nav-hover ms-lg-12 ps-lg-5 w-100">
                    <li className="nav-item ms-lg-auto">                      
                        {
                          this.state.isLoggedIn 
                          ? 
                          <Link to='/dashboard' className="nav-link nav-link-icon me-2 fs-5">
                            Dashboard
                          </Link> 
                          : 
                          <Link to='/register' className="nav-link nav-link-icon me-2 fs-5">
                          <i class="las la-user-plus me-1"></i>
                          Register
                        </Link>
                        }                      
                    </li>
                    <li className="nav-item my-auto ms-3 ms-lg-0">                                          
                        {
                          this.state.isLoggedIn ? <Link to="/login" onClick={this.onLoggedOutHandle} className="nav-link nav-link-icon me-2 fs-5">
                          <i class="las la-sign-in-alt me-1"></i>
                          Logout
                        </Link> :
                          <Link to="/login" className="nav-link nav-link-icon me-2 fs-5">
                            <i class="las la-sign-in-alt me-1"></i>
                            Login
                          </Link>
                        }                      
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div> 
      
      
    )
  }
}
