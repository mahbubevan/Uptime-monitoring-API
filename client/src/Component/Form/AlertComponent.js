import {Alert} from 'react-bootstrap'

export default function AlertComponent(props){
  const alertObject = {
    200:'primary',
    400:'danger',
    409:'warning',
    404:'danger',
  }

  return (
    <Alert variant={alertObject[props.code][0]}>
        {props.msg}
    </Alert>
  )
}
