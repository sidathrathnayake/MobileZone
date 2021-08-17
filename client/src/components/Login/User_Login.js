import React, {Component} from 'react';
import axios from 'axios';
import insert1 from '../../image/login.svg';
import insert2 from '../../image/forgotpassword.svg';
import NormalNavigation from '../Navigation/Normal_Navigation';
import Footer from '../Footer/Footer';

class User_Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userEmail: "",
            userPassword: "",
        }
    }

    componentDidMount() {

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


    userLoginHandler = (e) => {
        e.preventDefault();

        const {userEmail, userPassword} = this.state;

        const data = {
            userEmail: userEmail,
            userPassword: userPassword
        }

        axios.post("http://localhost:5000/user/userlogin", data).then((res) => {
            if (res.data.success) {
                localStorage.setItem("userToken", res.data.token);
                localStorage.setItem("userEmail", data.userEmail);
                alert('Logedin successfully.')
                this.props.history.push('/userhome');
            } else {
                alert('Email or password Incorrect.')
            }
        })

    }


    userForgotpasswordHandler = async (e) => {
        e.preventDefault();

        const {userEmail} = this.state;

        const data = {
            userEmail: userEmail
        }

        await axios.post("http://localhost:5000/user/userforgotpassword", data).then((res) => {

            if (res.data.success) {
                this.setState(data.data)
                alert('Email has been sent')
                this.props.history.push('/userlogin');
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
                                            id="userEmail"
                                            value={this.state.userEmail}
                                            onChange={this.handleInputChange}
                                            name="userEmail"
                                            placeholder="Enter Email"
                                            tabIndex={1}
                                            required>
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
                                            tabIndex={2}
                                            required>
                                        </input>
                                    </div>

                                    <div>
                                        <button type="submit" onClick={this.userLoginHandler}
                                                className="btn btn-primary" tabIndex={3}>Login
                                        </button>
                                    </div>
                                    <a className="text-right" href="/userregister">Do not have an account ? Sign up</a>
                                </form>

                                <form className="insert-form2" method="POST">
                                    <h1>Forgot Password</h1><br/><br/>

                                    <div className="input-field">
                                        <i className="fas fa-envelope-open-text"></i>
                                        <input
                                            type="text"
                                            id="userEmail"
                                            value={this.state.userEmail}
                                            onChange={this.handleInputChange}
                                            name="userEmail"
                                            placeholder="Enter email your registered with"
                                            tabIndex={1}
                                            required>
                                        </input>
                                    </div>

                                    <div>
                                        <button type="submit" onClick={this.userForgotpasswordHandler}
                                                className="btn btn-primary" tabIndex={3}>Send Email
                                        </button>
                                    </div>

                                </form>

                            </div>
                        </div>

                        <div className="panels-container">
                            <div className="panel left-panel">
                                <div className="panel-content">
                                    <h3>Forgot password?</h3>
                                    <p>Click here to reset your password.</p>
                                    <button className="btn transparent" id="left-panel-btn"> Reset</button>
                                </div>

                                <img className="insert-image" src={insert1} alt="Logo"/>

                            </div>

                            <div className="panel right-panel">
                                <div className="panel-content">
                                    <p>Please enter the email address you register your account with.
                                        We will send you a reset password link to this email.
                                        Click on the link and Reset Your Password.</p>
                                    <h3>Or</h3><br/>
                                    <button className="btn transparent" id="right-panel-btn"> Login</button>
                                </div>

                                <img className="insert-image" src={insert2} alt="Logo"/>

                            </div>

                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default User_Login;