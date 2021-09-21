import React from "react";
import LoggedOutButton from "./LoggedOutButton";
import CheckList from './Check/CheckList'
import CreateCheck from "./Check/CreateCheck";

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
      token:'',
      responseCodes:'',
      response:{
        responseCodes:'',
        responseMsg:''
      }
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
        // const phone = data.phone
        const id = data.id 
        this.setState({
          token:id
        })
        let getCheckUrl = `http://127.0.0.1:3000/check?tokenId=${id}`
        
        fetch(getCheckUrl).then(res=>res.json())
        .then(data=>{
          console.log(data);
          let newArr = data.message.map((val,id)=>{
            return JSON.parse(val.toString())
          })

          this.setState({
            checkList:newArr
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

    fetch(url,requestOptions).then(res=>{
      this.setState({
        responseCodes:res.status
      })
      return res.json()
    })
    .then(data=>{
      if (this.state.responseCodes === 200) {
        try {
          this.setState({
            checkList:[data.check,...this.state.checkList]
          })
        } catch (error) {
        }
      }
      
    }).catch(err=>console.log(err))
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
        <div className='row mt-5'>
          <div className='col-md-6'>
            <h2>User Dashboard</h2>
          </div>
          <div className='col-md-6'>
            <div className='ml-right'>
              <LoggedOutButton logout={this.props.onLoggedOut}/>  
            </div>
          </div>
        </div>
        
        <div className='row mt-5 mb-5'>
          <div className='col-md-8'>
            <CheckList checkList={this.state.checkList}/>
          </div>
          <div className='col-md-4'>
            <CreateCheck onFormSubmit={this.handleSubmit} inputVal={this.state} inputChange={this.onInputChange}/>
          </div>
        </div>
      </div>
    )
  }
}

export default UserDashboard
