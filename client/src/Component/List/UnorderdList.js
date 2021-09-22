import helpers from "../../helpers"

export default function UnorderdList(props){
    
    return(
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between">
                <span> First Name </span>
                <span> {props.data.firstName} </span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span> Last Name </span>
                <span> {props.data.lastName} </span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span> Phone </span>
                <span> {props.data.phone} </span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span> Total Checks Count </span>
                <span> {helpers.getLength(props.data.checks)} </span>
            </li>
        </ul>
    )
}
