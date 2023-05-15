import React from 'react';
import '../css/ProfileGlobal.css';
import '../css/inventario.css';

export function CardIlusion({style}){
  return <>
    <div className='infoContainerEquipment extra1'>
      <div className="titliItenInfo" style={style}></div>
      <div className="bodyItenInfo"></div>
    </div>
    <div className='infoContainerEquipment extra2'>
      <div className="titliItenInfo" style={style}></div>
      <div className="bodyItenInfo"></div>
    </div>
  </>
}
