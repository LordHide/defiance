import React, {useContext} from 'react';
import '../css/ProfileGlobal.css';
import '../css/inventario.css';
import StoreContext from '../context/StoreContext.js';
import StoreListContext from '../context/StoreListContext.js';
import InfoCardContext from '../context/InfoCardContext.js';
import CharacterContext from '../context/CharacterContext.js';
import {CreateIcon} from './CreateIcon.js';
import {ItenModule} from './ItenModule.js';
import {useGetItemActive} from '../hooks/useGetItemActive.js';

export function StoreList({nodeInfo, actionPermit}){

  const [store, setStore] = useContext(StoreContext);
  const [character, setCharacter] = useContext(nodeInfo.isRemote ? RemoteContext : CharacterContext);
  const [listStore, setlistStore] = useContext(StoreListContext);
  const [infoCard, setinfoCard] = useContext(InfoCardContext);
  const activeIten = useGetItemActive(character, nodeInfo);
  const closeHandler = () => {
    setlistStore(<></>)
  }

  const selectHandler = (newId, typeId) => {
    setinfoCard(<ItenInfo nodeInfo={{"type":typeId, "subType":nodeInfo.subType, "id": newId, "slotId":nodeInfo.slotId, "isRemote":nodeInfo.isRemote}} actionPermit={actionPermit} />)
  };

  return <>
    <div className='backGroundBlack' onClick={closeHandler}></div>
    <div className="listStoreContainer">
      <div className="topListSegment">
        <div className="titleList">
          <span> {<CreateIcon iconData={activeIten.slot} isActiveRange={false}/>}{activeIten.name} </span>
        </div>
        <div className="crossList" onClick={closeHandler}>
          x
        </div>
      </div>
      <div className="listTypeContainer">
      {
        nodeInfo.typeList.map(typeId => {
          const type = store.type[typeId];
          const asociatedItems = Array.isArray(type.asociatedItems[0]) ? type.asociatedItems[nodeInfo.subType] : type.asociatedItems
          return<div key={typeId} className="typeContainer">
            <div className="typeTitle">//{type.name}</div>
            {
              asociatedItems.map(itemId => {
                return <ItenModule key={itemId} store={store} relevantId={{"itemId":itemId, "typeId": typeId, "typeSlot": activeIten.typeSlot}} selectHandler={selectHandler} />
              })
            }
          </div>
        })
      }
      </div>
    </div>
  </>;
}