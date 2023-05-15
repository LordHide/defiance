import React, {useContext, useRef} from 'react';
import StoreContext from '../context/StoreContext.js';
import InfoCardContext from '../context/InfoCardContext.js';
import RemoteContext from '../context/RemoteContext.js'; 
import CharacterContext from '../context/CharacterContext.js';
import {useNewIdHandler} from '../hooks/useNewIdHandler.js';
import {useCorrectSlot} from '../hooks/useCorrectSlot.js';
import {useGetItemActive} from '../hooks/useGetItemActive.js';
import {CreateIcon} from './CreateIcon.js';
import {EditButtons} from './EditButtons.js';
import {ExtraInfo} from './ExtraInfo.js'; 
import {InfoHexCard} from './InfoHexCard.js';
import {CardIlusion} from './CardIlusion.js';
import '../css/ItenInfo.css';
import '../css/StoreList.css';

export function ItemInfo({nodeInfo, actionPermit}) {

    const [store, setStore] = useContext(StoreContext);
    const [infoCard, setinfoCard] = useContext(InfoCardContext);
    const [character, setCharacter] = useContext(nodeInfo.isRemote ? RemoteContext : CharacterContext);
    const activeIten = useGetItemActive(character, nodeInfo);
    const iten = store.items[nodeInfo.id];
    const validSlot = activeIten != undefined ? useCorrectSlot(iten.slots, activeIten.typeSlot):false;
    const swipeDiff = useRef(0);
    const colorPrincipal= "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+")";
    const colorSecondary= "rgba("+character.colorSecon.R+","+character.colorSecon.G+","+character.colorSecon.B+")";
    const infoHandler = () => {
      setinfoCard(<></>)
    }
    const scrollHandler = (evt) => {
      const newId = useNewIdHandler(evt.deltaY < 0 ? 1 : -1, store, nodeInfo);
      setinfoCard(<ItemInfo nodeInfo={{"type":nodeInfo.type, "subType":nodeInfo.subType, "id": newId, "slotId":nodeInfo.slotId, "isRemote":nodeInfo.isRemote}} actionPermit={actionPermit} />)
    };

    const keyHandler = (evt) => {
      let idModifier = 0;
      if(evt.code == "ArrowUp"){idModifier = 1}else if(evt.code == "ArrowDown" ){idModifier = -1}
      const newId = useNewIdHandler( idModifier, store, nodeInfo);
      if(idModifier != 0)setinfoCard(<ItemInfo nodeInfo={{"type":nodeInfo.type, "subType":nodeInfo.subType, "id": newId, "slotId":nodeInfo.slotId, "isRemote":nodeInfo.isRemote}} actionPermit={actionPermit} />)
    };

    const swHandler = (evt) => {
      let idModifier = 0;
      if(swipeDiff.current - evt.changedTouches[0].clientY > 10){idModifier = 1}else if(swipeDiff.current - evt.changedTouches[0].clientY < -10){idModifier = -1}
      const newId = useNewIdHandler( idModifier, store, nodeInfo);
      if(idModifier != 0)setinfoCard(<ItemInfo nodeInfo={{"type":nodeInfo.type, "subType":nodeInfo.subType, "id": newId, "slotId":nodeInfo.slotId, "isRemote":nodeInfo.isRemote}} actionPermit={actionPermit} />)
    };

    return (
      <> 
        <div className='backGroundBlack' onClick={infoHandler}></div>
          {nodeInfo.type !== "" ? <CardIlusion style={{"background": colorPrincipal}} /> : <></>}
          <div className='infoContainerEquipment' 
            onWheel={scrollHandler} onKeyDown={keyHandler} onTouchStart={(evt) => {swipeDiff.current = evt.changedTouches[0].clientY} } 
            onTouchEnd={swHandler} tabIndex={0} style={{"outline": "none"}}
          >
            <div className="titliItenInfo" style={{"background": colorPrincipal}}>
              <span>{iten.name}</span>
              <div className="crossCard" onClick={infoHandler}>
                x
              </div>
            </div>
              <div className="bodyItenInfo">
                <div>
                  <div className="itenType" style={{"background": "linear-gradient("+colorPrincipal+", "+colorSecondary+")"}}>{iten.itenTypes}</div>
                </div>
                  <InfoHexCard valuesHex={{"nameHex": "firstHex", "nodeHex": iten.firstHex}} style={{"background": colorPrincipal}} />
                  <InfoHexCard valuesHex={{"nameHex": "thirdHex", "nodeHex": iten.thirdHex}} style={{"background": colorPrincipal}} />
                  <InfoHexCard valuesHex={{"nameHex": "secondHex", "nodeHex": iten.secondHex}} style={{"background": colorPrincipal}} />
                  {iten.attributes.length != 0 && <ExtraInfo iten={iten} />}
                  <CreateIcon iconData={iten.image} isActiveRange={false}/>
              </div>
              {activeIten != undefined ? <EditButtons actionPermit={actionPermit} valid = {{"validSlot":validSlot, "isRemote":nodeInfo.isRemote, "validItem":activeIten.asociatedId == nodeInfo.id}} nodeInfo={nodeInfo} /> : <></>}
            </div>
        </>
    );
}
