import React from 'react';
import PlexiBrain from '../components/PlexiBrain';
import '../style/Plexi.scss'

function Plexi() {
  return(
    <div className='plexi'>
    <div className="target top left"></div>
    <div className="target top right"></div>
    <div className="target bottom left"></div>
    <div className="target bottom right"></div>
<div class="hud">
  <div class="blue">
    <div class="notches">
      <div class="notch notch1"></div>
      <div class="notch notch2"></div>
      <div class="notch notch3"></div>
      <div class="notch notch4"></div>
      <div class="notch notch5"></div>
      <div class="notch notch6"></div>
      <div class="notch notch7"></div>
      <div class="notch notch8"></div>
      <div class="notch notch9"></div>
      <div class="notch notch10"></div>
      <div class="notch notch11"></div>
      <div class="notch notch12"></div>
    </div>
    <div class="circle outer1"></div>
    <div class="circle outer2"></div>
    <div class="circle outer3"></div>
    <div class="circle inner1"></div>
    <div class="circle inner2"></div>
    <div class="topnotches">
      <div class="notch notch1"></div>
      <div class="notch notch2"></div>
      <div class="notch notch3"></div>
      <div class="notch notch4"></div>
      <div class="notch notch5"></div>
      <div class="notch notch6"></div>
      <div class="notch notch7"></div>
      <div class="notch notch8"></div>
      <div class="notch notch9"></div>
      <div class="notch notch10"></div>
      <div class="notch notch11"></div>
      <div class="notch notch12"></div>
    </div>
    <div class="bottomnotches">
      <div class="notch notch1"></div>
      <div class="notch notch2"></div>
      <div class="notch notch3"></div>
      <div class="notch notch4"></div>
      <div class="notch notch5"></div>
      <div class="notch notch6"></div>
      <div class="notch notch7"></div>
      <div class="notch notch8"></div>
      <div class="notch notch9"></div>
      <div class="notch notch10"></div>
      <div class="notch notch11"></div>
      <div class="notch notch12"></div>
    </div>
    <div class="circle inner3"></div>
    <div class="center">
      <div class="top left"></div>
      <div class="top right"></div>
      <div class="bottom left"></div>
      <div class="bottom right"></div>
    </div>
  </div>
  <div class="pink">
      <PlexiBrain/>
    <div class="circle inner1"></div>
    <div class="notches">
      <div class="notch notch1"></div>
      <div class="notch notch2"></div>
      <div class="notch notch3"></div>
      <div class="notch notch4"></div>
      <div class="notch notch5"></div>
      <div class="notch notch6"></div>
      <div class="notch notch7"></div>
      <div class="notch notch8"></div>
      <div class="notch notch9"></div>
      <div class="notch notch10"></div>
      <div class="notch notch11"></div>
      <div class="notch notch12"></div>
    </div>
  
    <div class="circle inner2"></div>
    <div class="callout left">
    <div class="title">computing</div>
    <div class="body">N606SP</div>
  </div>
  <div class="callout right">
    <div class="title">&copy; A-Social</div>
    <div class="body">design credit P Biseman</div>
  </div>
  </div>

</div>
</div>
)
}

export default Plexi;


