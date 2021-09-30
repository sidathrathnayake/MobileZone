import React, { Component } from 'react'
import axios from 'axios';
import insert1 from '../../image/register.svg';
import UserNavigation from '../Navigation/User_Navigation';
import Footer from '../Footer/Footer';

export default class User_Update extends Component {
    
    constructor(props){
        super(props);
    
        this.state = {
            userName:"",
            userEmail:"",
    
        }
    }
    
    handleInputChange = (e) => {
        const {name, value} = e.target;
    
        this.setState({
            ...this.state,
            [name]: value
        })
        
    }

    componentDidMount(){
        
        axios.get(`http://localhost:5000/user/userdatas/${localStorage.getItem("userId")}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    userName: res.data.user.userName,
                    userEmail: res.data.user.userEmail,
    
                });
                console.log(this.state.userdata)
            }
        })
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const { userName, userEmail}= this.state;
        
            
        const data = {
            userName: userName, 
            userEmail: userEmail,
        }
        axios.put(`http://localhost:5000/user/updateuser/${localStorage.getItem("userId")}`, data).then((res) =>{
            if(res.data.success){
                alert("Updated successfully");
                this.setState(
                    {   
                        userName:"",
                        userEmail:"",
                    }
                )
                this.props.history.push('/userprofile');
            }
            else{
                alert("Unable to update the data. Please try again!");
            }
        })
        
    }

    render() {
        return (
            <div>

            <UserNavigation/>
            <div className="userbody">
            <div className="test-container">
            <div className="insert-container">
            <div className="forms-container">
                <div className="insert">
                    <form className="insert-form1" method="POST">
                        <h1>Update</h1><br/><br/>
                        
                        <div className="input-field">
                            <i class="fas fa-user-circle"></i>
                                <input
                                    type="text" 
                                    id="userName" 
                                    value={this.state.userName} 
                                    onChange={this.handleInputChange}
                                    name="userName" 
                                    placeholder="Enter name"
                                    required    
                                >
                                </input>
                        </div>

                        <div className="input-field">
                            <i class="fas fa-envelope-open-text"></i>
                                <input
                                    type="email" 
                                    id="userEmail" 
                                    value={this.state.userEmail} 
                                    onChange={this.handleInputChange}
                                    name="userEmail" 
                                    placeholder="Enter email"
                                    required    
                                >
                                </input>
                        </div>

                        <div>
                            <button type="submit" onClick={this.onSubmit} 
                            className="btn btn-primary" tabIndex={3}>Update</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="panel-content">
                        <p>Please upate your data.</p>
                    </div>
                    
                    <img className="insert-image" src={insert1} alt="Logo" />

                </div>
            </div>
            
            </div>
            </div>
            </div>
            <Footer/>
        </div>
        )
    }
}
