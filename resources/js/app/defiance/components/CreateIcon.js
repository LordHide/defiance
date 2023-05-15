import React from 'react';
import '../css/ProfileGlobal.css';
import '../css/inventario.css';
import svgDispenser from '../svgDispenser.js';
import pngDispenser from '../pngDispenser.js';

export function CreateIcon({iconData, isActiveRange}){

  let icon;

  switch (iconData.type) {
    case "range":
      if(isActiveRange){
        icon = 
        <>
          <div className={"hexagon range"}>
            <i>{iconData.code}</i>
          </div>
        </>
        break;
      }
    case "text":
      icon = <span className={iconData.class} >{iconData.code}</span>
      break;

    case "svg": 
        icon = <img className={iconData.class} src={svgDispenser(iconData.code)} alt={iconData.code} />;
      break;

    case "png":
        icon = <img className={iconData.class} src={pngDispenser(iconData.code)} alt={iconData.code} />;
      break;
  
    default: icon = <></>
      break;
  }

  return icon;
}
