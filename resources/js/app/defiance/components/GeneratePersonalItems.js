import React, {useState,useContext} from 'react';
import CharacterContext from '../context/CharacterContext.js'; 
import RemoteContext from '../context/RemoteContext.js';
import StoreListContext from '../context/StoreListContext.js';
import StoreContext from '../context/StoreContext.js';
import InfoCardContext from '../context/InfoCardContext.js';
import {CreateIcon} from './CreateIcon.js'; 
import {InfoElementName} from './InfoElementName.js';
import {InfoElementRangeDice} from './InfoElementRangeDice.js';
import {ItemInfo} from './ItemInfo.js';
import {StoreList} from './StoreList.js';
import '../css/ProfileGlobal.css';
import '../css/Profile.css';

export function GeneratePersonalItems({element, colorPrincipal, extraClass, isRemote, typeId}){

  const [infoCard, setinfoCard] = useContext(InfoCardContext);
  const [listStore, setlistStore] = useContext(StoreListContext);
  const [store, setStore] = useContext(StoreContext);
  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const item = store.items[element.asociatedId];
  
  const infoHandler = () => {
    element.asociatedId != -1 ? setinfoCard(<ItemInfo nodeInfo={{"type":character.name, "subType": typeId, "id": element.asociatedId, "slotId":-1, "isRemote":isRemote }} actionPermit={{"editActive":false, "unequipActive":false, "buyActivve":false}} />):setinfoCard(<></>);
  }
  const listHandler = () => {
    setlistStore(<StoreList nodeInfo={{"typeList":[character.name, 20], "subType": typeId, "slotId":element.slotId, "isRemote":isRemote}} actionPermit={{"editActive":true, "unequipActive":true, "buyActivve":false}} colorPrincipal={colorPrincipal} />);
    element.asociatedId != -1 ? setinfoCard(<ItemInfo nodeInfo={{"type":character.name, "subType": typeId, "id": element.asociatedId, "slotId":element.slotId, "isRemote":isRemote}} actionPermit={{"editActive":true, "unequipActive":true, "buyActivve":false}} />):setinfoCard(<></>);
  }

  return (
      <div className="contenedorInfoElement">
        <CreateIcon iconData={element.slot} isActiveRange={true}/>
        <div onClick={listHandler}>
          <InfoElementName element={element} item={item} />
          <InfoElementRangeDice element={element} item={item} extraClass={extraClass} />
        </div>
        <div className="circleInfo" onClick={infoHandler}>
          <i>
          i
          </i>
        </div>
      </div>
  )
}