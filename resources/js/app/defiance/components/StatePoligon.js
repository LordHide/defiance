import React from 'react';
import '../css/ProfileGlobal.css';
import { usGetStatePoligonConf } from '../hooks/usGetStatePoligonConf.js';
import { RegularPolygon, Arc,} from 'react-konva';

export function StatePoligon({info, index, handleClick}){

  let canvasNode = <></>;

  const infoJson = usGetStatePoligonConf(info, index, handleClick);

  if(info.name != "oculto" && info.name != "inconsciente"){
    canvasNode = <RegularPolygon
      {...infoJson}
      sides= {3}
      radius= {window.innerWidth * (0.04058)}
    />
  }
  else{
    canvasNode = <Arc
      {...infoJson}
      angle={180}
      innerRadius={0}
      outerRadius= {window.innerWidth * 0.0288}
    />
  }

  return canvasNode;
}