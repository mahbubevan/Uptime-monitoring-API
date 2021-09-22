import LoginForm from "./Form/LoginForm"

function Login(props) {
  return (
      <div className='row'>
        <div className='col-md-12'>
            <LoginForm onLoggedIn={props.onLoggedIn}/>
        </div>
      </div>
    )
}


export default Login
