import React, { Component } from 'react';
import axios from 'axios';
import insert1 from '../../image/register.svg';
import NormalNavigation from '../Navigation/Normal_Navigation';
import Footer from '../Footer/Footer';
import moment from 'moment'

class User_Register extends Component {

    constructor(props){
        super(props);
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
        this.state = {
            userName:"",
            userEmail:"",
            userDate:moment().format("YYYY-MM-DD"),
            userPassword:"",
            userConfirmPassword:"",
    
        }
    }
    
    handleInputChange = (e) => {
        const {name, value} = e.target;
    
        this.setState({
            ...this.state,
            [name]: value
        })
        
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        
        const {userName, userEmail,userDate,userPassword,userConfirmPassword }= this.state;
        if(this.state.userPassword.length < 6 ){
            setTimeout((err)=>{
                return alert("Password must contain atleast 6 characters"); 
            },2000);
            
        }
        if( this.state.userPassword !== this.state.userConfirmPassword){
            setTimeout((err)=>{
                return alert("Password miss matching"); 
            },2000);
            
        }
        else{
            
        const data = {
            userName: userName, 
            userEmail: userEmail,
            userDate:userDate,
            userPassword: userPassword
        }
        axios.post('http://localhost:5000/user/userregister', data).then((res) =>{
            if(res.data.success){
                this.setState(
                    {   
                        userName:"",
                        userEmail:"",
                        userDate:"",
                        userPassword:""
                    }
                )
                alert('Registered Successfully')
                this.props.history.push('/userlogin');
            }

            else{
                alert('Registration unsuccessful. Try again later.')
            }
        });
        
        }
    };

    render() {
        return (
            <div>

            <NormalNavigation/>
            <div className="userbody">
            <div className="test-container">
            <div className="insert-container">
            <div className="forms-container">
                <div className="insert">
                    <form className="insert-form1" method="POST">
                        <h1>Sign Up</h1><br/><br/>
                        
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

                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                    type="password" 
                                    id="userPassword" 
                                    value={this.state.userPassword} 
                                    onChange={this.handleInputChange}
                                    name="userPassword" 
                                    placeholder="Enter Password"
                                    required    
                                >
                                </input>
                        </div>

                        <div className="input-field">
                            <i className="fas fa-user-lock"></i>
                            <input 
                                type="password" 
                                id="userConfirmPassword" 
                                value={this.state.userConfirmPassword} 
                                onChange={this.handleInputChange}
                                name="userConfirmPassword"  
                                placeholder="Confirm Password..."
                                required>
                            </input>
                        </div>
                        <div>
                            <button type="submit" onClick={this.onSubmit} 
                            className="btn btn-primary" tabIndex={3}>Register</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="panel-content">
                        <p>Please enter your Registration details.</p>
                    </div>
                    
                    <img className="insert-image" src={insert1} alt="Logo" />

                </div>
            </div>
            
            </div>
            </div>
            </div>
            <Footer/>
        </div>
        );
    }
}

export default User_Register;