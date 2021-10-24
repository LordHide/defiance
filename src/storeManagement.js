import React, {useContext, useRef} from 'react';
import StoreContext from './context/storeContext.js';
import StoreListContext from './context/StoreListContext.js';
import InfoCardContext from './context/InfoCardContext.js';
import RemoteContext from './context/RemoteContext.js';
import CharacterContext from './context/CharacterContext.js';
import svgDispenser from './svgDispenser.js';
import miniImg from './miniImgDispenser.js';
import './ItenInfo.css';
import './StoreList.css';

function ItenInfo({nodeInfo, actionPermit, colorPrincipal}) {

    const [store, setStore] = useContext(StoreContext);
    const [infoCard, setinfoCard] = useContext(InfoCardContext);
    const [character, setCharacter] = useContext(nodeInfo.isRemote ? RemoteContext : CharacterContext);
    const activeIten = getItemActive(character, nodeInfo);
    const iten = store["items"][nodeInfo.id];console.log(activeIten == undefined)
    const validSlot = activeIten != undefined ? correctSlot(iten.slots, activeIten.typeSlot):false;
    const swipeDiff = useRef(0);
    const infoHandler = () => {
      setinfoCard(<></>)
    }
    const scrollHandler = (evt) => {
      const newId = newIdHandler(evt.deltaY < 0 ? 1 : -1, store, nodeInfo);
      setinfoCard(<ItenInfo nodeInfo={{"type":nodeInfo.type, "subType":nodeInfo.subType, "id": newId, "slotId":nodeInfo.slotId, "isRemote":nodeInfo.isRemote}} actionPermit={actionPermit} colorPrincipal={colorPrincipal} />)
    };

    const keyHandler = (evt) => {
      let idModifier = 0;
      if(evt.code == "ArrowUp"){idModifier = 1}else if(evt.code == "ArrowDown" ){idModifier = -1}
      const newId = newIdHandler( idModifier, store, nodeInfo);
      if(idModifier != 0)setinfoCard(<ItenInfo nodeInfo={{"type":nodeInfo.type, "subType":nodeInfo.subType, "id": newId, "slotId":nodeInfo.slotId, "isRemote":nodeInfo.isRemote}} actionPermit={actionPermit} colorPrincipal={colorPrincipal} />)
    };

    const swHandler = (evt) => {
      let idModifier = 0;
      if(swipeDiff.current - evt.changedTouches[0].clientY > 10){idModifier = 1}else if(swipeDiff.current - evt.changedTouches[0].clientY < -10){idModifier = -1}
      const newId = newIdHandler( idModifier, store, nodeInfo);
      if(idModifier != 0)setinfoCard(<ItenInfo nodeInfo={{"type":nodeInfo.type, "subType":nodeInfo.subType, "id": newId, "slotId":nodeInfo.slotId, "isRemote":nodeInfo.isRemote}} actionPermit={actionPermit} colorPrincipal={colorPrincipal} />)
    };

    return (
      <> 
        <div className='backGroundBlack' onClick={infoHandler}></div>
          {nodeInfo.type !== "" ? <CardIlusion colorPrincipal={colorPrincipal} /> : <></>}
          <div className='infoContainerEquipment' 
            onWheel={scrollHandler} onKeyDown={keyHandler} onTouchStart={(evt) => {swipeDiff.current = evt.changedTouches[0].clientY} } 
            onTouchEnd={swHandler} tabIndex={0} style={{"outline": "none"}}
          >
            <div className="titliItenInfo" style={colorPrincipal}>
              <span>{iten.name}</span>
              <div className="crossCard" onClick={infoHandler}>
                x
              </div>
            </div>
              <div className="bodyItenInfo">
                <div>
                  <div className="itenType" style={colorPrincipal}>{iten.itenTypes}</div>
                </div>
                  <InfoHex valuesHex={{"nameHex": "firstHex", "nodeHex": iten.firstHex}} colorPrincipal={colorPrincipal} />
                  <InfoHex valuesHex={{"nameHex": "thirdHex", "nodeHex": iten.thirdHex}} colorPrincipal={colorPrincipal} />
                  <InfoHex valuesHex={{"nameHex": "secondHex", "nodeHex": iten.secondHex}} colorPrincipal={colorPrincipal} />
                  <div className="extraInfo glass">{
                      iten.attributes.map(info => {
                          let classSwitch = info.type+"Row";
                          let switchContainer = <></>;
                          if(info.type == "switch"){
                            classSwitch = "switchRow";
                            switchContainer = <div className="switchContainer">
                                {info.switch.map(iconData => {
                                      return createIcon(iconData)
                                  })
                                }
                            </div>
                          }

                          return <>
                              <div className="infoRow"> 
                                {switchContainer}
                                <div className={classSwitch}> 
                                    {info.content.map(iconData => {
                                        return createIcon(iconData)
                                })}
                                </div>
                              </div>
                              </>
                  })
                  }
                </div>
              </div>
              {activeIten != undefined ? <EditButtons actionPermit={actionPermit} valid = {{"validSlot":validSlot, "isRemote":nodeInfo.isRemote, "validItem":activeIten.asociatedId == nodeInfo.id}} nodeInfo={nodeInfo} /> : <></>}
            </div>
        </>
    );
}

function newIdHandler(idModifier, store, nodeInfo) {
  const asociatedIndex = nodeInfo.subType !== null ? 
    store.type[nodeInfo.type].asociatedItems[nodeInfo.subType] : store.type[nodeInfo.type].asociatedItems;
  const currentIndex = asociatedIndex.indexOf(nodeInfo.id);

  let indexValue = currentIndex + idModifier;
  let newId = 0;

  if(indexValue == asociatedIndex.length){
    indexValue = 0;
  }
  if(indexValue == -1){
    indexValue = asociatedIndex.length - 1;
  }

  newId = asociatedIndex[indexValue];

  return newId
}

function CardIlusion({colorPrincipal}){
  return <>
    <div className='infoContainerEquipment extra1'>
      <div className="titliItenInfo" style={colorPrincipal}></div>
      <div className="bodyItenInfo"></div>
    </div>
    <div className='infoContainerEquipment extra2'>
      <div className="titliItenInfo" style={colorPrincipal}></div>
      <div className="bodyItenInfo"></div>
    </div>
  </>
}


function InfoHex({valuesHex, colorPrincipal}){
  let infohex = <></>;

  if(valuesHex.nodeHex.length != 0){
    let contentNum = valuesHex.nodeHex.filter(nodeHex => nodeHex.class == "content" ||  nodeHex.class == "miniAvatar").length
    let gridColumns = {"gridTemplateColumns": "repeat("+contentNum+", 1fr)", "gridTemplateRows": valuesHex.nodeHex[0].class == "title" ? "57% 30%" : "100% 30%"};

    infohex = <div className={valuesHex.nameHex} style={colorPrincipal}>
    <div className="gridHex" style={gridColumns}>
      {valuesHex.nodeHex.map(info => {
            return <div className={info.type+""+info.class}>{createIcon(info)}</div>
        })
      }
      </div>
    </div>
  }

  return infohex;
}

function StoreList({nodeInfo, actionPermit, colorPrincipal}){

  const [store, setStore] = useContext(StoreContext);
  const [character, setCharacter] = useContext(nodeInfo.isRemote ? RemoteContext : CharacterContext);
  const [listStore, setlistStore] = useContext(StoreListContext);
  const [infoCard, setinfoCard] = useContext(InfoCardContext);
  const activeIten = getItemActive(character, nodeInfo);
  const closeHandler = () => {
    setlistStore(<></>)
  }

  const selectHandler = (newId, typeId) => {
    setinfoCard(<ItenInfo nodeInfo={{"type":typeId, "subType":nodeInfo.subType, "id": newId, "slotId":nodeInfo.slotId, "isRemote":nodeInfo.isRemote}} actionPermit={actionPermit} colorPrincipal={colorPrincipal} />)
  };

  return <>
    <div className='backGroundBlack' onClick={closeHandler}></div>
    <div className="listStoreContainer">
      <div className="topListSegment">
        <div className="titleList">
          <span> {createIcon(activeIten.slot)}{activeIten.name} </span>
        </div>
        <div className="crossList" onClick={closeHandler}>
          x
        </div>
      </div>
      {
        nodeInfo.typeList.map(typeId => {
          const type = store.type[typeId];
          return<div className="typeContainer">
            <div className="typeTitle">//{type.name}</div>
            {
              type.asociatedItems[nodeInfo.subType].map(itemId => {
                return <ItenModule store={store} relevantId={{"itemId":itemId, "typeId": typeId, "typeSlot": activeIten.typeSlot}} selectHandler={selectHandler} />
              })
            }
          </div>
        })
      }
    </div>
  </>;
}

function EditButtons({actionPermit, valid, nodeInfo}){
  let buttons = <></>;

  const [character, setCharacter] = useContext(valid.isRemote ? RemoteContext : CharacterContext);
  const [store, setStore] = useContext(StoreContext);
  const unEquipClick = (nodeInfo) => {
    const storePosition = getStorePosition(store, nodeInfo);
    const itemPosition = getItemPosition(character, nodeInfo);
    character.slots[nodeInfo.subType].items[itemPosition] = {"slotId": item.slotId, "typeSlot":item.typeSlot, "asociatedId": -1, "name": "", "info": [], "slot": item.slot};
    store.type[character.name].asociatedItems[nodeInfo.subType].splice(storePosition, 1);
    setCharacter({...character});
    setStore({...store});
  };
  const equipClick = (nodeInfo) => {
    return () => {
        character.slots[nodeInfo.subType].items.map((item, index) => {
          if(item.slotId == nodeInfo.slotId){
            const storePosition = store.type[character.name].asociatedItems[nodeInfo.subType].indexOf(item.asociatedId);
            character.slots[nodeInfo.subType].items[index] = {"slotId": item.slotId, "typeSlot":item.typeSlot, "asociatedId": -1, "name": "", "info": [], "slot": item.slot};
            store.type[character.name].asociatedItems[nodeInfo.subType].splice(storePosition, 1);
            setCharacter({...character});
            setStore({...store});
          }
        });
      }
  };

    buttons = <div>
      {(actionPermit.editActive && valid.validSlot) ? <button onClick={equipClick(nodeInfo)}>Equipar</button> : <></>}
      {(actionPermit.unequipActive && valid.validItem) ? <button onClick={unEquipClick(nodeInfo)}>Descartar</button> : <></>}
      {actionPermit.buyActivve ? <button>Comprar</button> : <></>}
    </div>;

  return buttons;
}

function getItemActive(character, nodeInfo){
  const activeIten = character.slots[nodeInfo.subType].items.find(
    element => element.slotId == nodeInfo.slotId
    );

  return activeIten;
}

function getItemPosition(store, nodeInfo){

  let itemPosition;

  character.slots[nodeInfo.subType].items.map((item, index) => {
    if(item.slotId == nodeInfo.slotId){
      itemPosition = index;
    }
  });

  return itemPosition;
}

function getStorePosition(){
  return store.type[character.name].asociatedItems[nodeInfo.subType].indexOf(item.asociatedId);
}

function ItenModule({store, relevantId, selectHandler}){

  const activeSlot = store.items[relevantId.itemId].slots;
  const validSlot = correctSlot(activeSlot, relevantId.typeSlot);
  let itenModule = <></>;

  itenModule = activeSlot.map( slots => {
    return <div className={"typeTitle"}>{
      slots.icon.map(icon => {
        return createIcon(icon)
      })
    }</div>
  });
  return <div className={validSlot ? "item active" : "item deactive" } onClick={ validSlot ? ()=>{selectHandler(relevantId.itemId, relevantId.typeId)} : null}>
    {itenModule}{store.items[relevantId.itemId].name}
  </div>;
}

function correctSlot(activeSlot, typeSlot){
  let validate = false;

  activeSlot.map(slotInfo => {
    if(typeSlot == 1 && (slotInfo.TypeId == 1 || slotInfo.TypeId == 2)){
      validate = true;
    }
    else if(typeSlot == 3 && (slotInfo.TypeId == 3 || slotInfo.TypeId == 5)){
      validate = true;
    }
    else if(typeSlot == 4 && (slotInfo.TypeId == 4 || slotInfo.TypeId == 5)){
      validate = true;
    }
    else if(typeSlot == slotInfo.TypeId || validate){
      validate = true;
    }
  });
    

  return validate;
}

function createIcon(iconData){

    let icon;
  
    switch (iconData.type) {
      case "text":
        icon = <span className={iconData.class} >{iconData.code}</span>
        break;

      case "range":
        icon = 
        <>
          <div className={"hexagon "+iconData.class}>
            <i>{iconData.code}</i>
          </div>
        </>
        break;
  
      case "svg": 
          icon = <img className={iconData.class} src={svgDispenser(iconData.code)} alt={iconData.code} />;
        break;

      case "png":
          icon = <img className={iconData.class} src={miniImg[iconData.code]} alt={iconData.code} />;
        break;
    
      default: icon = <></>
        break;
    }
  
    return icon;
  }


export {ItenInfo, StoreList};
