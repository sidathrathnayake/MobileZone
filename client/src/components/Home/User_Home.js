import React, { Component } from 'react';
import UserNavigation from '../Navigation/User_Navigation';
import Footer from '../Footer/Footer';
import UserCover from '../CoverImage/User_Cover';
import LatestItems from '../Item/LatestItems'

class User_Home extends Component {
    render() {
        return (
            <div>
                <UserNavigation/>
                <UserCover/>
                <LatestItems/>
                <Footer/>
            </div>
        );
    }
}

export default User_Home;