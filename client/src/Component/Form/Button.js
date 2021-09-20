function Button(props){
  return (
    <button type="submit" className={props.btnStyle}>{props.title}</button>
  )
}

export default Button
