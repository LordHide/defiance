import React from 'react';
import svgDispenser from '../svgDispenser.js';
import '../css/ProfileGlobal.css';
import {StatePoligon} from './StatePoligon.js';
import { Image as ImageKonva } from 'react-konva';

export function StateGeneration({info, index, handleClick}){
  const image = new Image();
  image.src = svgDispenser(info.icon.text);

  return <>
    <StatePoligon info={info} index={index} handleClick={handleClick} />
    <ImageKonva
      image={image}
      x= {window.innerWidth * info.icon.x}
      y= {window.innerWidth * info.icon.y}
      height= {window.innerWidth * 0.018}
      width= {window.innerWidth * 0.018}
      onClick={handleClick(index)}
      onTap={handleClick(index)}
    />
  </> 
}