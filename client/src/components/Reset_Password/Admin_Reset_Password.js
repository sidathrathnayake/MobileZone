/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
import insert1 from '../../image/resetpassword.svg';
import NormalNavigation from '../Navigation/Normal_Navigation';
import Footer from '../Footer/Footer';

class Admin_Reset_Password extends Component {

    constructor (props){
        super(props );
    
        this.state = {
            adminPassword:"",
            adminConfirmPassword:""
            
        }
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;
    
        this.setState({
            ...this.state,
            [name]: value
        })
        
    }

adminResetpasswordHandler = async (e) => {
    e.preventDefault();

    const {adminPassword,adminConfirmPassword }= this.state;

    if(this.state.adminPassword.length < 8 ){
        setTimeout((err)=>{
            return alert("Password must contain atleast 8 characters"); 
        },2000);
        
    }
    if( this.state.adminPassword !== this.state.adminConfirmPassword){
        setTimeout((err)=>{
            return alert("Password miss matching"); 
        },2000);
        
    }
    const data = {
        adminPassword: adminPassword
    }
    
    await axios.put(`http://localhost:5000/admin/adminresetpassword/${this.props.match.params.resetToken}`,data).then((res) =>{

    if(res.data.success){
                this.setState(data.data)
                this.props.history.push('/adminlogin');
            }
            
    })

    

};

    render() {
        return (
            <div>
            <NormalNavigation/>
            <div className="insert-container">
            <div className="forms-container">
                <div className="insert">
                    <form className="insert-form1" method="POST">
                        <h1>Reset Password</h1><br/><br/>
                        
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input 
                                type="password" 
                                id="adminPassword" 
                                value={this.state.adminPassword} 
                                onChange={this.handleInputChange}
                                name="adminPassword" 
                                placeholder="Enter new password."
                                required>                
                            </input>
                        </div>

                        <div className="input-field">
                            <i className="fas fa-user-lock"></i>
                            <input 
                                type="password" 
                                id="adminConfirmPassword" 
                                value={this.state.adminConfirmPassword} 
                                onChange={this.handleInputChange}
                                name="adminConfirmPassword"  
                                placeholder="Confirm Password..."
                                required>
                            </input>
                        </div>

                        <div>
                            <button type="submit" onClick={this.adminResetpasswordHandler} 
                            className="btn btn-primary" tabIndex={3}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="panel-content">
                        <p>Please enter new password to reset to your password. 
                            Please note that your old password will not be valid anymore.</p>
                    </div>
                    
                    <img className="insert-image" src={insert1} alt="Logo" />

                </div>
            </div>
            
            </div>
            <Footer/>
        </div>
        );
    }
}

export default Admin_Reset_Password;