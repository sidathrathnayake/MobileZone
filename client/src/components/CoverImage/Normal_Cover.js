import React, { Component } from 'react';
import background from "../../image/background.png";
import insert1 from '../../image/allcover.png';
import insert2 from '../../image/applecover.png';
import insert3 from '../../image/samsungcover.png';
import insert4 from '../../image/huaweicover.png';
import insert5 from '../../image/accessoriescover.png';




class Normal_Cover extends Component {
    
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
            <div >
                <div className="coverslide-container" >

                    <div className="cover-slides">
                        <h2>Mobiles
                            <span><a href="/">MobileZone.com</a></span>
                        </h2>
                        <img className="cover-image" src={insert1} alt="Logo" />
                        <div className="cover-details">
                            <h4>Find the best mobile phones from here.</h4>
                        </div>
                    </div>

                    <div className="cover-slides" >
                        <h2>Apple
                            <span><a href="/">MobileZone.com</a></span>
                        </h2>
                        <img className="cover-image" src={insert2} alt="Logo" />
                        <div className="cover-details">
                            <h4>Find the best Apple mobiles from here.</h4>
                            <p>Buy world famous mobile devices for a lowest price around the world. </p>
                            <button className="btn" ><a href="/">Find</a></button>
                        </div>
                    </div>

                    <div className="cover-slides">
                        <h2>Samsung
                            <span><a href="/">MobileZone.com</a></span>
                        </h2>
                        <img className="cover-image" src={insert3} alt="Logo" />
                        <div className="cover-details">
                            <h4>Find the best Samsung mobiles from here.</h4>
                            <p>Buy world famous mobile devices for a lowest price around the world. </p>
                            <button className="btn" ><a href="/">Find</a></button>
                        </div>
                    </div>

                    <div className="cover-slides">
                        <h2>Huawei
                            <span><a href="/">MobileZone.com</a></span>
                        </h2>
                        <img className="cover-image" src={insert4} alt="Logo" />
                        <div className="cover-details">
                            <h4>Find the best Huawei mobiles from here.</h4>
                            <p>Buy world famous mobile devices for a lowest price around the world. </p>
                            <button className="btn" ><a href="/">Find</a></button>
                        </div>
                    </div>

                    <div className="cover-slides">
                        <h2>Accessories
                            <span><a href="/">MobileZone.com</a></span>
                        </h2>
                        <img className="cover-image" src={insert5} alt="Logo" />
                        <div className="cover-details">
                            <h4>Find the best mobile accessories from here.</h4>
                            <p>Buy best mobile accessories for a lowest price. </p>
                            <button className="btn" ><a href="/">Find</a></button>
                        </div>
                    </div>

                <a className="prev" onClick="plusSlides(-1)">&#10094;</a>
                <a className="next" onClick="plusSlides(+1)">&#10095;</a>
                </div>
            </div>
        );
    }
}

export default Normal_Cover;