import React from "react"
import UnorderdList from "../../List/UnorderdList"

class UserInfo extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            userInfo:[],
            isLoaded:false
        }
    }

    async componentDidMount()
    {
        const x = document.cookie
        const tokenId = x.split('=')[1]
        const url = `http://127.0.0.1:3000/token?id=${tokenId}`

        const tokenObject = await fetch(url).then(res=>res.json())
        const getUserUrl = `http://127.0.0.1:3000/user?phone=${tokenObject.phone}&tokenId=${tokenObject.id}`
        const userObject = await fetch(getUserUrl).then(res=>res.json())
        const user = userObject.data
        
        this.setState({
            userInfo:user,
            isLoaded:true
        })
    }

    render(){
        return(
            <div>
                <h4>User Informaation</h4>
                {
                    this.state.isLoaded ? <UnorderdList data={this.state.userInfo}/> : null
                }
            </div>
        )
    }
}

export default UserInfo