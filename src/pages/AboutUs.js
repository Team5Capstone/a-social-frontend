import React, { useState }from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"; 
import aboutData  from '../components/AboutData';
import '../style/About.css';


 function About() {
    const [currentIndex, setCurrentIndex] = useState();
    function handleChange(index) {
      setCurrentIndex(index);
    }
    return (
        <div>
            <h2>About A-SOCIAL</h2>
            <div className='aboutpj'>
            {/* <p> </p> */}
            </div>
            <div className='display'>
            <h1>About Developers </h1>
            <div className="About">
        
            <Carousel
             showArrows={true}
             autoPlay={true}
             infiniteLoop={true}
             selectedItem={aboutData[currentIndex]}
             onChange={handleChange}
             className="carousel-container"
            >
            {aboutData.map((data, index) => (
                <div key={index}>
                  <img src={data.url} alt={data.alt} />
                  <p>{data.quote}</p>
                </div>
                ))}
            </Carousel>

            </div>
            </div>
        </div>
    );
}

export default About;