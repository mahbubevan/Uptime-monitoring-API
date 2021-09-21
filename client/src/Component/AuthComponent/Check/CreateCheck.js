import Form from "./Form";

export default function CreateCheck(props){
    return(
        <div>
          <h3>Create New Check</h3>
          <Form btnTitle="Create" onFormSubmit={props.onFormSubmit} inputVal={props.inputVal} inputChange={props.inputChange}/>
        </div>
    )
}
