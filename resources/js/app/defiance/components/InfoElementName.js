import React from 'react';
import '../css/ProfileGlobal.css';
import '../css/inventario.css';

export function InfoElementName({element, item}){
  return <div className="infoElement1" title={element.name}>
          <div>{(item !== undefined && item.firstHex.length !==0) ?item.name:""}</div>
        </div> 
}