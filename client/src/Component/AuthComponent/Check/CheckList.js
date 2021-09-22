import helpers from "../../../helpers"

export default function CheckList(props){
    const elements = props.checkList
    const count = elements.length
    return (
      <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card mb-4">
            <div class="card-header pb-0">
              <h6>Check List Table - {count}</h6>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Protocol</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">URL</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Method</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Success Codes</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Timeout Seconds</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Current State</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Last Checked</th>
                      <th class="text-secondary opacity-7">Action</th>
                    </tr>
                  </thead>
                  <tbody>  
                    {
                    elements.map((value,id)=>(
                        <tr key={id}>
                          <td className="align-middle text-center">
                            <p class="text-xs font-weight-bold mb-0">{value.id}</p>                            
                          </td>                            
                            <td className="align-middle text-center"> <p class="text-xs font-weight-bold mb-0">{value.protocol}</p> </td>
                            <td className="align-middle text-center"> <p class="text-xs font-weight-bold mb-0">{value.url}</p> </td>
                            <td className="align-middle text-center"> <p class="text-xs font-weight-bold mb-0">{value.method}</p> </td>
                            <td className="align-middle text-center"> {value.successCodes.map((val,id)=>{
                                return (<p class="text-xs font-weight-bold mb-0">{val}</p>)
                            })}  </td>
                            <td className="align-middle text-center"> <p class="text-xs font-weight-bold mb-0">{value.timeoutSeconds}</p> </td>                            
                            <td className="align-middle text-center"> 
                                <span className={value.state==='up' ? 'badge badge-sm bg-gradient-success' : 'badge badge-sm bg-gradient-dark'}>
                                    {value.state}
                                </span>
                            </td>
                            <td className="align-middle text-center"> <span className="text-secondary text-xs font-weight-bold">{helpers.getDateTime(value.lastChecked)}</span>  </td>
                            <td className="align-middle">
                              <span title='Edit' onClick={props.editHandle.bind(this,value.id)} className='btn btn-sm btn-info text-white me-1'>
                              <i class="las la-pen"></i>
                              </span>
                              <span title='Delete' onClick={props.deleteHandle.bind(this,value.id)} className='btn btn-sm btn-danger text-white'>
                                <i class="las la-trash"></i>
                              </span>
                            </td>
                        </tr>
                    ))
                }      
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    )
}
