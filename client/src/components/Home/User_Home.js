import React, { Component } from 'react';
import UserNavigation from '../Navigation/User_Navigation';
import Footer from '../Footer/Footer';
import UserCover from '../CoverImage/User_Cover'

class User_Home extends Component {
    render() {
        return (
            <div>
                <UserNavigation/>
                <UserCover/>
                <Footer/>
            </div>
        );
    }
}

export default User_Home;