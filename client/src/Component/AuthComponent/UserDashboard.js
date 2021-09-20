import React from "react";
import LoggedOutButton from "./LoggedOutButton";
import CheckList from './Check/CheckList'
import CreateCheck from "./Check/CreateCheck";
import DefaultOption from "../DefaultOption";

class UserDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      checkList:[],
      protocol:'',
      url:'',
      method:'',
      successCodes:[201,200,301],
      timeoutSeconds:0,
      token:''
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    const x = document.cookie
    const tokenId = x.split('=')[1]
    
    let url = `http://127.0.0.1:3000/token?id=${tokenId}`
    fetch(url).then(res=>res.json())
      .then(data=>{
        const phone = data.phone
        const id = data.id 
        this.setState({
          token:id
        })
        let getCheckUrl = `http://127.0.0.1:3000/check`
        fetch(getCheckUrl).then(res=>res.json())
        .then(data=>{
          console.log(data);
          this.setState({
            checkList:data.message
          })
        })
      })
  }

  handleSubmit(e){
    e.preventDefault()
    const url = `http://127.0.0.1:3000/check`
    const body = {
      protocol:this.state.protocol,
      url:this.state.url,
      method:this.state.method,
      successCodes:this.state.successCodes,
      timeoutSeconds:this.state.timeoutSeconds,
      token:this.state.token
    }
    const headerOption = {
      headers: {
        'Content-Type': 'text/plain',
          'Authorization': 'Bearer my-token',
          'My-Custom-Header': 'foobar'
      }
    };

    const requestOptions = {
      method: 'POST',
      headerOption,
      credentials:'include',
      body: JSON.stringify(body)
  };

    fetch(url,requestOptions).then(res=>res.json())
    .then(data=>{
      this.setState({
        checkList:[data.check]
      })
      
    })
  }

  onInputChange(e){
    const target = e.target 
    const value = target.type === 'select-multiple' ? target.options : target.value 
    const name = target.name

    this.setState({
      [name]:value
    })
  }

  render()
  {
    return (
      <div className='container'>
        <LoggedOutButton logout={this.props.onLoggedOut}/>
        <h2>User Dashboard</h2>
        <div className='row mt-5 mb-5'>
          <div className='col-md-6'>
            <CheckList checkList={this.state.checkList}/>
          </div>
          <div className='col-md-6'>
            <CreateCheck onFormSubmit={this.handleSubmit} inputVal={this.state} inputChange={this.onInputChange}/>
          </div>
        </div>
      </div>
    )
  }
}

export default UserDashboard
