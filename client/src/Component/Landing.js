import Login from "./Login"
import Register from "./Register"

function Landing()
{
  return <div className='container'>

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
        <Login />
      </div>
    </div>
  </div>
}

export default Landing
