import React, { Component } from 'react';
import NormalNavigation from '../Navigation/Normal_Navigation';
import Footer from '../Footer/Footer';
import NormalCover from '../CoverImage/Normal_Cover'

class Normal_Home extends Component {
    render() {

        return (
            <div>
                <NormalNavigation/>
                <NormalCover/>
                <Footer/>
            </div>
        );
    }
}

export default Normal_Home;