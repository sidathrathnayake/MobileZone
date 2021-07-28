import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12 segment-one md-mb-30 sm-mb-30">
                            <h3>Code Rebels</h3>
                            <p>Fast growing company with experts with knowladge of most commonly used technologies. Such as 
                                Node JS, React JS, Angilar JS, Express JS, MongoDB, Spring boot, Java and various other technologies. We always 
                                offer you our help the best way we can since customer satisfaction is our main goal.
                            </p>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12 segment-two md-mb-30 sm-mb-30">
                            <h3>Links</h3>
                            <ul>
                                <li><a href="#"><i className="fas fa-blog"></i>&nbsp;Personal Blog</a></li>
                                <li><a href="#"><i className="fab fa-github-square"></i>&nbsp;Github</a></li>
                                <li><a href="#"><i className="fas fa-calendar-alt"></i>&nbsp;Events</a></li>
                                <li><a href="#"><i className="fas fa-user-tie"></i>&nbsp;Career</a></li>
                                <li><a href="#"><i className="fas fa-hands-helping"></i>&nbsp;Support</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12 segment-three md-mb-30 sm-mb-30">
                            <h3>Follow Us</h3>
                            <p>Please follow us on our social media profiles in order to keep updated.</p>
                            <a href="#"><i className="fa fa-facebook"></i></a>&nbsp;
                            <a href="#"><i className="fa fa-twitter"></i></a>&nbsp;
                            <a href="#"><i className="fa fa-linkedin"></i></a>&nbsp; 
                            <a href="#"><i className="fa fa-instagram"></i></a>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12 segment-four md-mb-30 sm-mb-30">
                            <h3>Contact Us</h3>
                            <p>Contact us if you need any help</p>
                            <address>
                                <li><a href="#"><i className="fas fa-at"></i>&nbsp;Email &nbsp;&nbsp;&nbsp;  coderebels@gmail.com</a></li><br/>
                                <li><a href="#"><i className="fas fa-phone-square"></i>&nbsp;Mobile &nbsp;  0760666236</a></li><br/>
                                <li><a href="#"><i className="fas fa-tty"></i>&nbsp;Office &nbsp;&nbsp;&nbsp;  0354343261</a></li><br/>
                                <li><a href="#"><i className="fas fa-fax"></i>&nbsp;Fax  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </a></li>
                            </address>
                        </div>
                    </div>
                </div>
            </div>
            <p className="footer-bottom-text"> All right reserved by &copy; SIR96.2021 </p>
            </footer>
        );
    }
}

export default Footer;