import React from 'react';
import '../css/ProfileGlobal.css';
import '../css/inventario.css';
import {InfoHex} from './InfoHex.js';
import { useActiveSlot } from '../hooks/useActiveSlot.js';

export function InfoElementRangeDice({element, item, extraClass}){
  const correctSlot = item.slots.length !== 0 ? useActiveSlot(item.slots[0].TypeId, element.typeSlot) : false;
  return  <div className={"infoElement2 "+extraClass}>
            <InfoHex correctSlot={correctSlot} hex={item.firstHex}/>
            <InfoHex correctSlot={correctSlot} hex={item.secondHex}/>
          </div>
}