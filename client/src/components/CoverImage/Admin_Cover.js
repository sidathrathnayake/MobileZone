import React, { Component } from 'react';
import insert1 from '../../image/allcover.png';
import insert2 from '../../image/usercover.png';
import insert3 from '../../image/categorycover.png';
import insert4 from '../../image/paymentcover.png';


class Admin_Cover extends Component {
    
componentDidMount(){
    
    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n)
     }

    function showSlides(n){
        var i;
        var slides = document.getElementsByClassName("cover-slides");
        if(n > slides.length){
            slideIndex = 1;
        }

        if(n < 1){
            slideIndex = slides.length
        }

        for( i = 0; i < slides.length; i++){
            slides[i].style.display = "none";
        }

        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        slides[slideIndex-1].style.display = "block";
        setTimeout(showSlides, 5000); 

    }

}   
    
    render() {
        return (
            <div>
                <div className="coverslide-container">

                    <div className="cover-slides">
                        <h2>Mobiles
                            <span><a href="/">MobileZone.com</a></span>
                        </h2>
                        <img className="cover-image" src={insert1} alt="Logo" />
                        <div className="cover-details">
                            <h4>Insert Mobile devices and accessories to sell.</h4>
                            <button className="btn" ><a href="/ho">Go</a></button>
                        </div>
                    </div>

                    <div className="cover-slides">
                        <h2>Users
                            <span><a href="/">MobileZone.com</a></span>
                        </h2>
                        <img className="cover-image" src={insert2} alt="Logo" />
                        <div className="cover-details">
                            <h4>Handle User details.</h4>
                            <p>Handle all the user deatils and CRUD operations from here. </p>
                            <button className="btn" ><a href="/userdetails">Go</a></button>
                        </div>
                    </div>

                    <div className="cover-slides">
                        <h2>Categoreis
                            <span><a href="/">MobileZone.com</a></span>
                        </h2>
                        <img className="cover-image" src={insert3} alt="Logo" />
                        <div className="cover-details">
                            <h4>Handle Category details.</h4>
                            <p>Handle all the category deatils and CRUD operations from here.. </p>
                            <button className="btn" ><a href="/ho">Go</a></button>
                        </div>
                    </div>

                    <div className="cover-slides">
                        <h2>Payments
                            <span><a href="/">MobileZone.com</a></span>
                        </h2>
                        <img className="cover-image" src={insert4} alt="Logo" />
                        <div className="cover-details">
                            <h4>Handle Payment details.</h4>
                            <p>Handle all the payment deatils and CRUD operations from here.. </p>
                            <button className="btn" ><a href="/ho">Go</a></button>
                        </div>
                    </div>

                <a className="prev" onClick="plusSlides(-1)">&#10094;</a>
                <a className="next" onClick="plusSlides(+1)">&#10095;</a>
                </div>
            </div>
        );
    }
}

export default Admin_Cover;