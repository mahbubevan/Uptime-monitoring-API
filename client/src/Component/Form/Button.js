function Button(props){
  return (
    <button onClick={props.clickEvent} type={props.type} className={props.btnStyle}>{props.title}</button>
  )
}

export default Button
