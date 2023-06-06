import React, { useState, useEffect } from 'react';
import '../style/404Page.scss'

function FourOFour() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push(<div className="star" key={i}></div>);
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="wrapper">
      <div className="text_group">
        <p className="text_404">404</p>
        <p className="text_lost">The page you are looking for <br />has been lost in space.</p>
        <p className="text_lost">But You are not alone.</p>
        <p className="text_lost">Please Navigate Home ღ</p>
      </div>
      <div className="window_group">
        <div className="window_404">
          <div className="stars">
            {stars}
          </div>
          {/* <div className="meteor-container">
            <div className="meteor"></div>
            <div className="meteor"></div>
            <div className="meteor"></div>
            <div className="meteor"></div>
          </div>
          <div className="meteor-container-2">
            <div className="meteor"></div>
            <div className="meteor"></div>
            <div className="meteor"></div>
            <div className="meteor"></div>
          </div> */}
          <div className="astronaut">
            <img
              src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
              alt=""
              className="src"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FourOFour;