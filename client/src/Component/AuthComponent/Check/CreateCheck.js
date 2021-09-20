import Button from './../../Form/Button'
export default function CreateCheck(props){
    return(
        <div>
        <form className="row g-3" onSubmit={props.onFormSubmit}>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Protocol</label>
          <input type="text" value={props.inputVal.protocol} name='protocol' onChange={props.inputChange} className="form-control" 
          id="inputEmail4"/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">URL</label>
          <input type="text" value={props.inputVal.url} name='url' onChange={props.inputChange} className="form-control" id="inputPassword4"/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">METHOD</label>
          <input type="text" value={props.inputVal.method} name='method' onChange={props.inputChange} className="form-control" id="inputPassword4"/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Timeout Seconds</label>
          <input type="text" value={props.inputVal.timeoutSeconds} name='timeoutSeconds' onChange={props.inputChange} className="form-control" id="inputPassword4"/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Success Codes</label>
          
          <select className='form-control' value={props.inputVal.successCodes} name='successCodes[]' multiple={true} onSelect={props.inputChange}>
                <option value='200'>200</option>
                <option value='201'>201</option>
                <option value='301'>301</option>
          </select>
        </div>
        <div className="col-12">
          <Button title="Create Check" btnStyle='btn btn-success'/>
        </div>
      </form>
    </div>
    )
}