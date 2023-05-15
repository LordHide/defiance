import React from 'react';
import '../css/ProfileGlobal.css';
import '../css/inventario.css';
import {useCorrectSlot} from '../hooks/useCorrectSlot'
import {CreateIcon} from './CreateIcon.js';

export function ItenModule({store, relevantId, selectHandler}){

  const activeSlot = store.items[relevantId.itemId].slots;
  const unlock = store.items[relevantId.itemId].unlock;
  const validSlot = useCorrectSlot(activeSlot, relevantId.typeSlot);
  let itenModule = <></>;
  let contUniq = 0;

  itenModule = activeSlot.map( slots => {
    return <div key={contUniq++} className={"typeTitle"}>{
      slots.icon.map(icon => {
        return <CreateIcon key={contUniq++} iconData={icon} isActiveRange={false} />
      })
    }</div>
  });
  return <div className={ unlock && validSlot ? "item active" : "item deactive" } onClick={ unlock && validSlot ? ()=>{selectHandler(relevantId.itemId, relevantId.typeId)} : null}>
    <div className="itemSlots">
      {itenModule}
    </div>
    <div className="contentSlot">
      {unlock ? store.items[relevantId.itemId].name : "????????"}
    </div>
  </div>;
}