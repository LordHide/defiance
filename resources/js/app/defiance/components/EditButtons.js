import React from 'react';
import {useUnEquip} from '../hooks/useUnEquip.js';
import {useEquip} from '../hooks/useEquip.js';
import '../css/ProfileGlobal.css';
import '../css/Profile.css';

export function EditButtons({actionPermit, valid, nodeInfo}){
  let buttons = <></>;

  const unEquipClick = useUnEquip(valid);
  const equipClick = useEquip(valid);

    buttons = <div className="editButtons">
      {(actionPermit.editActive && !valid.validItem && valid.validSlot ) ? <button onClick={()=>equipClick(nodeInfo)}>Equipar</button> : <></>}
      {(actionPermit.unequipActive && valid.validItem) ? <button onClick={()=>unEquipClick(nodeInfo)}>Descartar</button> : <></>}
      {actionPermit.buyActivve ? <button>Comprar</button> : <></>}
    </div>;

  return buttons;
}