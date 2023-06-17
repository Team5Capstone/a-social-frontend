import React from 'react';
import PlexiBrain from '../components/PlexiBrain';
import '../style/Plexi.scss';

function Plexi() {
  const renderNotches = () => {
    const notches = [];
    for (let i = 1; i <= 12; i++) {
      notches.push(<div className={`notch notch${i}`} key={i}></div>);
    }
    return notches;
  };

  return (
    <div className="plexi-container">
      <div className="plexi">
        <div className="hud">
          <div className="blue">
            <div className="notches">{renderNotches()}</div>
            <div className="circle outer1"></div>
            <div className="circle outer2"></div>
            <div className="circle outer3"></div>
            <div className="circle inner1"></div>
            <div className="circle inner2"></div>
            <div className="topnotches">{renderNotches()}</div>
            <div className="bottomnotches">{renderNotches()}</div>
            <div className="circle inner3"></div>
          </div>
          <div className="pink">
            <div className="circle inner1"></div>
            <div className="notches">{renderNotches()}</div>
          </div>
            <PlexiBrain />
        </div>
      </div>
     
    </div>
  );
}

export default Plexi;
