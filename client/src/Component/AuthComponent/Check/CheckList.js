export default function CheckList(props){
    const elements = props.checkList
    const count = elements.length
    return(
        <div>
            <h3>Total Check List:- {count}</h3>
            <ul>
                {
                    elements.map((value,id)=>(
                        <li key={id}>
                            {value.id} -- {value.url}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}