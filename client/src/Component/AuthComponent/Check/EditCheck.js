import Form from "./Form";

export default function EditCheck(props){
    return(
        <div>
          <h3>Edit This Check</h3>
          <Form btnTitle="Edit" onFormSubmit={props.onFormSubmit} inputVal={props.inputVal} inputChange={props.inputChange}/>
        </div>
    )
}
