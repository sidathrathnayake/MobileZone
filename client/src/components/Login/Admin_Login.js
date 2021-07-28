import React, { Component } from 'react';
import axios from 'axios';
import insert1 from '../../image/login.svg';
import insert2 from '../../image/forgotpassword.svg';
import NormalNavigation from '../Navigation/Normal_Navigation';
import Footer from '../Footer/Footer';

class Admin_Login extends Component {

    constructor (props){
        super(props);
    
        this.state = {
            adminEmail:"",
            adminPassword:"",
        }
    }
    
        componentDidMount(){

        const right_panel_btn = document.querySelector("#right-panel-btn");
        const left_panel_btn = document.querySelector("#left-panel-btn");
        const container = document.querySelector(".insert-container");
  
        left_panel_btn.addEventListener('click', () => {
            container.classList.add("category-mode");
        });
  
        right_panel_btn.addEventListener('click', () => {
            container.classList.remove("category-mode");
        });

     }

    handleInputChange = (e) => {
        const {name, value} = e.target;
    
        this.setState({
            ...this.state,
            [name]: value
        })
        
    }
    
    
    adminLoginHandler = (e) => {
        e.preventDefault();
        
        const { adminEmail, adminPassword } = this.state;
        
        const data = {
            adminEmail: adminEmail,
            adminPassword: adminPassword
        }
            
        axios.post("http://localhost:5000/admin/adminlogin",data).then((res) =>{
                if(res.data.success){
                    localStorage.setItem("adminToken", res.data.token);
                    localStorage.setItem("adminEmail", data.adminEmail);
                    alert('Logedin successfully.')
                    this.props.history.push('/adminhome');
                }
                else{
                    alert('Email or password Incorrect.')
                }
            })
              
    }


    adminForgotpasswordHandler = async (e) => {
        e.preventDefault();
 
        const {adminEmail} = this.state;

        const data = {
            adminEmail: adminEmail
        } 
       
            await axios.post("http://localhost:5000/admin/adminforgotpassword", data).then((res) =>{
                
            if(res.data.success){
                this.setState(data.data)
                alert('Email has been sent')
                this.props.history.push('/adminlogin');
            }
            
            })
 
    
    }

    render() {
        return (
            <div>
            <NormalNavigation/>
            <div className="test-container">
            <div className="insert-container">
            <div className="forms-container">
                <div className="insert">
                    <form className="insert-form1" method="POST">
                        <h1>Sign in</h1><br/><br/>
                        
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input 
                                    type="text" 
                                    id="adminEmail" 
                                    value={this.state.adminEmail} 
                                    onChange={this.handleInputChange}
                                    name="adminEmail" 
                                    placeholder="Enter Email"
                                    tabIndex={1}
                                    required>
                            </input>
                        </div>

                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input 
                                    type="password" 
                                    id="adminPassword" 
                                    value={this.state.adminPassword} 
                                    onChange={this.handleInputChange}
                                    name="adminPassword" 
                                    placeholder="Enter Password"
                                    tabIndex={2}
                                    required>
                            </input>
                        </div>

                        <div>
                            <button type="submit" onClick={this.adminLoginHandler} 
                            className="btn btn-primary" tabIndex={3}>Login</button>
                        </div>
                    </form>

                    <form className="insert-form2" method="POST">
                        <h1>Forgot Password</h1><br/><br/>
                        
                        <div className="input-field">
                            <i className="fas fa-envelope-open-text"></i>
                            <input 
                                type="text" 
                                id="adminEmail" 
                                value={this.state.adminEmail} 
                                onChange={this.handleInputChange}
                                name="adminEmail" 
                                placeholder="Enter email your registered with"
                                tabIndex={1}
                                required>
                            </input>
                        </div>

                        <div>
                            <button type="submit" onClick={this.adminForgotpasswordHandler} 
                            className="btn btn-primary" tabIndex={3}>Send Email</button>
                        </div> 

                    </form>

                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="panel-content">
                        <h3>Forgot password?</h3>
                        <p>Click here to reset your password.</p>
                        <button className="btn transparent" id="left-panel-btn" > Reset </button>
                    </div>
                    
                    <img className="insert-image" src={insert1} alt="Logo" />

                </div>

                <div className="panel right-panel">
                    <div className="panel-content">
                        <p>Please enter the email address you register your account with. 
                            We will send you a reset password link to this email. 
                            Click on the link and Reset Your Password.</p>
                        <h3>Or</h3><br/>
                        <button className="btn transparent" id="right-panel-btn" > Login </button>
                    </div>
                    
                    <img className="insert-image" src={insert2} alt="Logo" />

                </div>

            </div>
            
            </div>
            </div>
            <Footer/>
        </div>
        );
    }
}

export default Admin_Login;