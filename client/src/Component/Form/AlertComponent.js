import {Alert} from 'react-bootstrap'

export default function AlertComponent(props){
  const alertObject = {
    200:['primary','Your request has been succeeded'],
    400:['danger','Bad Request'],
    409:['warning','Already Registered User !!!']
  }

  return (
    <Alert variant={alertObject[props.code][0]}>
        {alertObject[props.code][1] }
    </Alert>
  )
}
