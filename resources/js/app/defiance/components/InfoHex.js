import React from 'react';
import '../css/ProfileGlobal.css';
import '../css/inventario.css';
import {CreateIcon} from './CreateIcon.js';

export function InfoHex({correctSlot, hex}){
  let contUniq = 0;
  return hex.map(
    (iconInfo) => {
      const itenValido = correctSlot && iconInfo.code !== '-' && !iconInfo.class.includes("void");
        return itenValido && <CreateIcon key={contUniq++} iconData={iconInfo} isActiveRange={true}/>
    }
  )
}