import RegisterForm from "./Form/RegisterForm"

function Register() {
  return (
  <div>
    <div className='row mb-5'>
      <div className='col-md-12 text-center'>
        <h5> Sign Up </h5>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-12'>
          <RegisterForm />
      </div>
    </div>
  </div>)
}


export default Register
