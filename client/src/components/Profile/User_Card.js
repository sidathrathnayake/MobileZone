import React, { Component } from 'react';
import usercard from '../../image/usercard.png';
import axios from 'axios';

export default class User_Card extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            user:{}
        };
    }

    componentDidMount(){

        axios.get(`http://localhost:5000/user/userdata/${localStorage.getItem("userEmail")}`).then((res) =>{
           
        if(res.data.success){
                this.setState({
                    user:res.data.user,
                });
                console.log(this.state.user)
                
            }
        })
    }
    
    render() {

        const { _id,userName, userEmail,}= this.state.user;
        localStorage.setItem("userId", _id);

        return (
            <div>
                <div className="usercards">

                    <div className="usercard">
                        <div className="usercard-container">
                            <img className="usercard-image" src={usercard} alt="Card" />
                        </div>
                        <div className="usercard-details">

                            <h3>Name</h3>
                            <p>{userName}</p>
                            

                            <h3>Email</h3>
                            <p>{userEmail}</p>
                            <br/>
                            
                            <a href={`/updateuser/${localStorage.getItem("userId")}`}><button className="btn" >Edit</button></a>

                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}
