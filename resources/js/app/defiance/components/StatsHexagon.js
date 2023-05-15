import React from 'react';
import '../css/ProfileGlobal.css';
import svgDispenser from '../svgDispenser.js';
import { RegularPolygon, Image as ImageKonva } from 'react-konva';
import {StatText} from './StatText.js';
import {StatImage} from './StatImage.js';
//import useImage from 'use-image';

export 
function StatsHexagon({stat, colorPrincipal, colorSecondary}){
  let contentComponent = <></>;
  const componentX = window.innerWidth * stat.positionX;
  const componentY = window.innerWidth * stat.positionY;
  const contentWidth = window.innerWidth*0.016;
  const image = new Image(); 
  image.src = svgDispenser(stat.marker);

  if (typeof (stat.max) === "object") {

    contentComponent = <StatImage stat={stat} positions={{"componentX":componentX, "contentWidth":contentWidth, "componentY":componentY}} />
   
  }
  else{
  contentComponent = <StatText stat={stat} positions={{"componentX":componentX, "contentWidth":contentWidth, "componentY":componentY}} />;
  }

  return (
  <>
    <RegularPolygon
      x= {componentX}
      y= {componentY}
      sides= {6}
      radius= {window.innerWidth*0.022}
      rotation= {90}
      stroke= {"rgb(112, 112, 112"}
      strokeWidth={3}
      fillLinearGradientStartPoint= { {x: 50, y: -70} }
      fillLinearGradientEndPoint= { {x: -50, y: 15} }
      fillLinearGradientColorStops= {[0, colorPrincipal, 1, colorSecondary]}
    />
    <ImageKonva
      image={image}
      x= {componentX - (contentWidth)/2}
      y= {componentY - contentWidth}
      height= {contentWidth}
      width= {contentWidth}
    />
    {contentComponent}
  </>);
}