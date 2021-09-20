import LoginForm from "./Form/LoginForm"

function Login(props) {
  return (
    <div>
      <div className='row mb-5'>
        <div className='col-md-12 text-center'>
          <h5> Sign In </h5>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
            <LoginForm onLoggedIn={props.onLoggedIn}/>
        </div>
      </div>
    </div>)
}


export default Login
