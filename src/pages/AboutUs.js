import React, { useState }from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"; 
// import { renderSlides } from './CarouselUtils';
import { aboutData } from '../components/AboutData';
import '../style/About.css';
// import '../
import Footer from '../components/Footer';
// const renderSlides = aboutData.map((image) => (
//     <div key={image.alt}>
//       <p>{image.quote}</p>
//       <img src={image.url} alt={image.alt} />
//       <p className="legend">{image.label}</p>
     
//     </div>
//   ));
 function About() {
    const [currentIndex, setCurrentIndex] = useState();
    function handleChange(index) {
      setCurrentIndex(index);
    }
    return (
        <div>
            <h2>About A-SOCIAL</h2>
            <div className='aboutpj'>
            <p> </p>
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
            {/* {renderSlides} */}
            </Carousel>
            </div>
            </div>
        </div>
    );
}

export default About;