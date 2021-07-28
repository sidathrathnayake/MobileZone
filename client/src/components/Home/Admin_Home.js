import React, { Component } from 'react';
import AdminNavigation from '../Navigation/Admin_Navigation';
import Footer from '../Footer/Footer';
import AdminCover from '../CoverImage/Admin_Cover'

class Admin_Home extends Component {
    render() {
        return (
            <div>
                <AdminNavigation/>
                <AdminCover/>
                <Footer/>
            </div>
        );
    }
}

export default Admin_Home;