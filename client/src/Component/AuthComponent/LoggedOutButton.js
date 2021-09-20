export default function LoggedOutButton(props)
{
  return (
    <button type="button" onClick={props.logout} className='btn btn-dark'>Log Out</button>
  )
}
