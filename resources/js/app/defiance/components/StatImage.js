import React from 'react';
import '../css/ProfileGlobal.css';
import '../css/inventario.css';
import svgDispenser from '../svgDispenser.js';
import { Image as ImageKonva } from 'react-konva';

export function StatImage({stat, positions}){
  let imagePositionX = stat.max.length > 1 ? (positions.componentX + positions.contentWidth*0.8) : 0;
  let contUniq = 0;
  const contentComponent =  stat.max.map( (maxData) => {
    const imageData = new Image();
    imagePositionX = stat.max.length > 1 ? imagePositionX-((positions.contentWidth*0.8)) : positions.componentX - positions.contentWidth*0.33;
    imageData.src = svgDispenser(maxData.code);
    return (
      <ImageKonva key={contUniq++}
        image={imageData}
        x= {(imagePositionX)}
        y= {(positions.componentY + (window.innerWidth*0.00396))}
        height= {positions.contentWidth*0.75}
        width= {positions.contentWidth*0.75}
      />);
  })

  return contentComponent;
}