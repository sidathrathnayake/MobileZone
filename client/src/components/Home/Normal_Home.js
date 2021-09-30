import React, { Component } from 'react';
import NormalNavigation from '../Navigation/Normal_Navigation';
import Footer from '../Footer/Footer';
import NormalCover from '../CoverImage/Normal_Cover';
import LatestItems from '../Item/LatestItems';

class Normal_Home extends Component {
    render() {

        return (
            <div>
                <NormalNavigation/>
                <NormalCover/>
                <LatestItems/>
                <Footer/>
            </div>
        );
    }
}

export default Normal_Home;