import Button from "./Button"

function LoginForm() {
  return (
  <form className="row g-3">
    <div className="col-md-6">
      <label htmlFor="inputEmail4" className="form-label">Phone</label>
      <input type="text" className="form-control" id="inputEmail4"/>
    </div>
    <div className="col-md-6">
      <label htmlFor="inputPassword4" className="form-label">Password</label>
      <input type="password" className="form-control" id="inputPassword4"/>
    </div>
    <div className="col-12">
      <Button title="Login" btnStyle='btn btn-primary'/>
    </div>
  </form>
  )
}


export default LoginForm
