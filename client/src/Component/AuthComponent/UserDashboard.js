import React from "react";
import Button from "../Form/Button";
import CheckList from './Check/CheckList';
import CreateCheck from "./Check/CreateCheck";
import EditCheck from "./Check/EditCheck";
import LoggedOutButton from "./LoggedOutButton";
import UserInfo from "./UserComponent/UserInfo";

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
      },
      action:{
        edit:false,
        editId:'',
        deleteId:''
      }
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.editHandle = this.editHandle.bind(this)
    this.deleteHandle = this.deleteHandle.bind(this)

    this.checkCreateForm = this.checkCreateForm.bind(this)
  }

  editHandle(id){
    let checkId = id
    let check = this.state.checkList.filter((val,id)=>{
      return val.id === checkId
    })
  
    this.setState({
      protocol:check[0].protocol,
      url:check[0].url,
      method:check[0].method,
      successCodes:check[0].successCodes,
      timeoutSeconds:check[0].timeoutSeconds,
      action:{
        edit:true,
        editId:check[0].id
      }
    })

  }

  deleteHandle(id){
    let checkId = id
    const url = `http://127.0.0.1:3000/check/delete?id=${checkId}`

    const body = {
      token:this.state.token
    }

    const headerOption = {
      headers: {
        'Content-Type': 'text/plain'
      }
    };

    const requestOptions = {
      method: 'POST',
      headerOption,
      credentials:'include',
      body: JSON.stringify(body)
    };

    fetch(url,requestOptions)
    .then(res=>res.json())
    .then(data=>{
      let newArr = this.state.checkList.filter((val,id)=>{
        return val.id !== checkId
      })

      this.setState({
        checkList:newArr,
        protocol:'',
        method:'',
        url:'',
        successCodes:[200,201,301],
        timeoutSeconds:0,
        action:{
          edit:false
        }
      })
    })
    .catch(err=>console.log(err))
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

  handleEditSubmit(e){    
    e.preventDefault()
    const url = `http://127.0.0.1:3000/check/update`
    const body = {
      id:this.state.action.editId,
      protocol:this.state.protocol,
      url:this.state.url,
      method:this.state.method,
      successCodes:this.state.successCodes,
      timeoutSeconds:this.state.timeoutSeconds,
      token:this.state.token
    }
    const headerOptions = {
      headers:{
        'Content-Type':'text/plain',
        'Accept':'application/json'
      }
    }
    const requestOptions = {
      method: 'POST',
      headerOptions,
      credentials:'include',
      body: JSON.stringify(body)
    };

    fetch(url,requestOptions)
    .then(res=>res.json())
    .then(data=>{
      let newArr = this.state.checkList.filter((val,id)=>{
        return val.id !== data.data.id
      })

      newArr.push(data.data)
      console.log(newArr,"New Array");

      this.setState({
        checkList:newArr,
        protocol:'',
        method:'',
        url:'',
        successCodes:[200,201,301],
        timeoutSeconds:0,
        action:{
          edit:false
        }
      })
    })
    .catch(err=>console.log(err))
  }

  onInputChange(e){
    const target = e.target 
    const value = target.type === 'select-multiple' ? target.options : target.value 
    const name = target.name

    this.setState({
      [name]:value
    })
  }

  checkCreateForm(e){
    this.setState({
      protocol:'',
      method:'',
      url:'',
      successCodes:[200,201,301],
      timeoutSeconds:0,
      action:{
        edit:false
      }
    })
  }

  render()
  {
    return (
      <div className='container-fluid'>
        <div className='row mt-5'>
          <div className='col-md-6'>
            <h2>User Dashboard</h2>
          </div>
          <div className='col-md-6'>
            <div className='row'>
              <div className='col-md-6'>
                <Button clickEvent={this.checkCreateForm} type='button' title='Check Create Form' btnStyle='btn btn-sm btn-info text-white' />
              </div>
              <div className='col-md-6'>
                <LoggedOutButton logout={this.props.onLoggedOut}/>  
              </div>
            </div>
          </div>
        </div>
        
        <div className='row mt-5 mb-5'>
          <div className='col-md-8'>
            <CheckList editHandle={this.editHandle} deleteHandle={this.deleteHandle} checkList={this.state.checkList}/>
          </div>
          <div className='col-md-4'>
            <div className='row'>
            {
              this.state.action.edit ? <EditCheck onFormSubmit={this.handleEditSubmit} inputVal={this.state} inputChange={this.onInputChange}/> 
              : <CreateCheck onFormSubmit={this.handleSubmit} inputVal={this.state} inputChange={this.onInputChange}/>
            }
            </div>
            <div className='row mt-5 mb-5'>
              <UserInfo />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserDashboard
