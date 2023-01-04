import React, {useContext} from 'react';
import CharacterContext from './context/CharacterContext.js';
import StoreContext from './context/storeContext.js';
import {ItenInfo, StoreList} from './storeManagement.js';
import RemoteContext from './context/RemoteContext.js';
import InfoCardContext from './context/InfoCardContext.js';
import StoreListContext from './context/StoreListContext.js';
import {CreateIcon} from './storeManagement.js';
import svgDispenser from './svgDispenser.js';
import characterImg from './pngDispenser.js';
import './css/ProfileGlobal.css';
import './css/inventario.css';

function Inventario({isRemote}) {

  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const [store, setStore] = useContext(StoreContext);
  const colorPrincipal= character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B;
  const colorSecondary= character.colorSecon.R+","+character.colorSecon.G+","+character.colorSecon.B;
  const profileImg = characterImg(character.name);
  const [infoCard, setinfoCard] = useContext(InfoCardContext);
  const [listStore, setlistStore] = useContext(StoreListContext);

  const listHandler = (element, typeId) => {
    const typelistSlot = getTypelistSlot(element.typeSlot, character.name);
    setlistStore(<StoreList nodeInfo={{"typeList":typelistSlot, "subType": typeId, "slotId":element.slotId, "isRemote":false}} actionPermit={{"editActive":true, "unequipActive":true, "buyActivve":false}} colorPrincipal={{"backgroundColor": "rgba("+colorPrincipal+", 1)"}} />);
    element.asociatedId != -1 ? setinfoCard(<ItenInfo nodeInfo={{"type":character.name, "subType": typeId, "id": element.asociatedId, "slotId":element.slotId, "isRemote":false}} actionPermit={{"editActive":true, "unequipActive":true, "buyActivve":false}} colorPrincipal={{"backgroundColor": "rgba("+colorPrincipal+", 1)"}} />):setinfoCard(<></>);
  }

  let top = 16;
  let leftEven = 15;
  let leftOdd = 48;
  let animationDelay = 1.7;
  let animationSoftware = 1.8;

  return (
      <div className="Inventory">
        <img src={profileImg} className="character" alt="character" />
        {character.slots[0].items.map( (info, index) => {
                const itemInfo = store.items[info.asociatedId];
                animationDelay = infoIntervaloCorrecto("animationDelay", index, animationDelay);
                top = infoIntervaloCorrecto("top", index, top);
                return<>
                  <div
                    className={"hexagon slot type"+info.typeSlot} 
                    style={{
                      "top": top+"vh",
                      "left": ((index+1) % 2 !== 0 ? leftEven:leftOdd)+"vw",
                      "zIndex": 2,
                      "animationDelay": animationDelay+"s",
                      "background": "linear-gradient("+"rgba("+colorPrincipal+", 1)"+", "+"rgba("+colorSecondary+", 1)"+")"
                    }}
                    onClick={() => {return listHandler(info, 0)}}
                  >
                    {itemInfo !== undefined && <CreateIcon iconData={itemInfo.image} isActiveRange={false} />}
                  </div>
                  <div
                    className={"hexagon slotType type"+info.typeSlot} 
                    style={{
                      "top": (top+2)+"vh",
                      "left": ((index+1) % 2 !== 0 ? leftEven+2:leftOdd-4)+"vw",
                      "zIndex": 1,
                      "animationDelay": (animationDelay+0.1)+"s",
                      "backgroundColor": "rgba("+colorPrincipal+", 0.6)"
                    }}
                  >
                    <div className={((index+1) % 2 !== 0 ?"even":"odd")}>
                      <CreateIcon iconData={info.slot} isActiveRange={false}/>
                    </div>
                  </div>
                </>
              } ) 
        }
        <div className={"softwareTitle"} style={{"backgroundColor": "rgba("+colorPrincipal+", 1)"}}>Software</div>
        <div className={"software"} style={{"background": "linear-gradient("+"rgba("+colorPrincipal+", 0.6)"+", "+"rgba("+colorSecondary+", 0.6)"+")"}}>
          {character.slots[1].items.map( (info, index) => {
            if(index > 0){
              const itemInfo = store.items[info.asociatedId];
              animationSoftware +=0.2;
              return <div className="softwareRow" style={{
                    'animation-delay': animationSoftware+"s"
                  }}>
                  <div className="slotType"><CreateIcon iconData={info.slot} isActiveRange={false} /></div>
                  <div 
                    className="softwareInfo"
                    style={{
                    "backgroundColor": "rgba("+colorPrincipal+", 1)"
                    }}
                    onClick={() => {return listHandler(info, 1)}}
                    >
                    {itemInfo.name}
                  </div>
                </div>
            }
          })}
        </div>
      </div>
  );
}

function getTypelistSlot(typeSlot, name){
  if(typeSlot === 1){
    return [name, 12, 13];
  }
  else if(typeSlot === 3){
    return [name, 19, 13, 20];
  }
  else if(typeSlot === 4){
    return [name, 20];
  }
  else if(typeSlot === 6){
    return [name, 21];
  }
  else if(typeSlot === 7){
    return [name, 2];
  }
}

function infoIntervaloCorrecto(tipo, index, value){

  switch (tipo) {
    case "animationDelay":
      if(index === 2){
        value = 1.6;
      }
      else if(index === 4){
        value = 2.3;
      }
      else if((index+1) % 2 !== 0){
        value = value+0.2
      }
      break;
  
    default:
      if(index === 2){
        value = 1;
      }
      else if(index === 3){
        value = 16;
      }
      else if(index === 4){
        value = 46;
      }
      else if((index+1) % 2 !== 0){
        value = value+15
      }
      break;
  }

  return value;
}

export default Inventario;
