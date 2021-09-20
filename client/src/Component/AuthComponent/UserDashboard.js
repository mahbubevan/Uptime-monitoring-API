import React from "react";
import LoggedOutButton from "./LoggedOutButton";

class UserDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentWillUnmount(){
    
  }

  render()
  {
    return (
      <div className='container'>
        <LoggedOutButton logout={this.props.onLoggedOut}/>
        <h2>User Dashboard</h2>
      </div>
    )
  }
}

export default UserDashboard
