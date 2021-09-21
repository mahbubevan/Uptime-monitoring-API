export default function CheckList(props){
    const elements = props.checkList
    const count = elements.length
    return(
        <div className='table-responsive'>
            <table className="table">
            <caption>Total Check List:- {count}</caption>
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#Id</th>
                    <th scope="col">Protocol</th>
                    <th scope="col">URL</th>
                    <th scope="col">Method</th>
                    <th scope="col">Success Codes</th>
                    <th scope="col">Timeout Seconds</th>
                    <th scope="col">Current State</th>
                    <th scope="col">Last Checked</th>
                    </tr>
                </thead>
                <tbody>
                {
                    elements.map((value,id)=>(
                        <tr key={id}>
                            <th scope='row'>{value.id}</th>
                            <td> {value.protocol} </td>
                            <td> {value.url} </td>
                            <td> {value.method} </td>
                            <td> {value.successCodes.map((val,id)=>{
                                return val +',\n'
                            })} </td>
                            <td> {value.timeoutSeconds} </td>
                            <td> 
                                <span className={value.state==='up' ? 'badge bg-success' : 'badge bg-danger'}>
                                    {value.state}
                                </span>
                            </td>
                            <td> {new Date(value.lastChecked).toString()} </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}