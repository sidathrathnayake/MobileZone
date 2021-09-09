import React, { Component } from 'react'
/**Imorting the addToCart & removerFromCart methods from cartActions */
import { resetCart } from "../../redux/actions/cartActions";

import {useDispatch} from 'react-redux';


export default class abc extends Component {
    
    render() {

        return (
            <div>
                <button onClick={this.reset}>HIHIHI</button>
            </div>
        )
    }
}
