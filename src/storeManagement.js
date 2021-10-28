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
    const iten = store.items[nodeInfo.id];
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
      <div className="listTypeContainer">
      {
        nodeInfo.typeList.map(typeId => {
          const type = store.type[typeId];
          const asociatedItems = Array.isArray(type.asociatedItems[0]) ? type.asociatedItems[nodeInfo.subType] : type.asociatedItems
          return<div className="typeContainer">
            <div className="typeTitle">//{type.name}</div>
            {
              asociatedItems.map(itemId => {
                return <ItenModule store={store} relevantId={{"itemId":itemId, "typeId": typeId, "typeSlot": activeIten.typeSlot}} selectHandler={selectHandler} />
              })
            }
          </div>
        })
      }
      </div>
    </div>
  </>;
}

function EditButtons({actionPermit, valid, nodeInfo}){
  let buttons = <></>;

  const [character, setCharacter] = useContext(valid.isRemote ? RemoteContext : CharacterContext);
  const [store, setStore] = useContext(StoreContext);

  const unEquipClick = useUnEquip(valid);
  const equipClick = useEquip(valid);

    buttons = <div>
      {(actionPermit.editActive && !valid.validItem && valid.validSlot ) ? <button onClick={()=>equipClick(nodeInfo)}>Equipar</button> : <></>}
      {(actionPermit.unequipActive && valid.validItem) ? <button onClick={()=>unEquipClick(nodeInfo)}>Descartar</button> : <></>}
      {actionPermit.buyActivve ? <button>Comprar</button> : <></>}
    </div>;

  return buttons;
}

function getItemActive(character, nodeInfo){
  const activeIten = character.slots[nodeInfo.subType].items.find(
    element => element.slotId === nodeInfo.slotId
    );

  return activeIten;
}

function getItemPositionBySlotId(character, nodeInfo){

  let itemPosition;

  character.slots[nodeInfo.subType].items.map((item, index) => {
    if(item.slotId === nodeInfo.slotId){
      return itemPosition = index;
    }
  });

  return itemPosition;
}

function getItemPositionByTypeSlot(character, nodeInfo, notIndex){

  let itemPosition;

  character.slots[nodeInfo.subType].items.map((item, index) => {
    if(item.typeSlot === nodeInfo.typeSlot && index !== notIndex){
      return itemPosition = index;
    }
  });

  return itemPosition;
}

function getItemPositionByAsociatedId(character, nodeInfo){

  let itemPosition;

  character.slots[nodeInfo.subType].items.map((item, index) => {
    if(item.asociatedId === nodeInfo.id){
      itemPosition = index;
    }
  });

  return itemPosition;
}

function getStorePosition(store, nodeInfo, extraParm){
  return store.type[extraParm.name].asociatedItems[nodeInfo.subType].indexOf(extraParm.asociatedId);
}

function useUnEquip(valid){
  const [character, setCharacter] = useContext(valid.isRemote ? RemoteContext : CharacterContext);
  const [store, setStore] = useContext(StoreContext);
  const [listStore, setlistStore] = useContext(StoreListContext);
  const [infoCard, setinfoCard] = useContext(InfoCardContext);
  return (nodeInfo) => {
    const itemPosition = getItemPositionBySlotId(character, nodeInfo);
    const item = character.slots[nodeInfo.subType].items[itemPosition];
    const storePosition = getStorePosition(store, nodeInfo, {"name":character.name, "asociatedId":item.asociatedId});

    if(store.items[item.asociatedId].slots[0].TypeId == 5){
      const siblingItemPositionHead = getItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 3}, -1);
      const siblingItemPositionChest = getItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 4}, -1);
      character.slots[nodeInfo.subType].items[siblingItemPositionHead] = createrCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHead], nodeInfo, "unAssign");
      character.slots[nodeInfo.subType].items[siblingItemPositionChest] = createrCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionChest], nodeInfo, "unAssign");
    }
    else if(store.items[item.asociatedId].slots[0].TypeId == 2){
      const siblingItemPositionHand1 = getItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 1}, -1);
      const siblingItemPositionHand2 = getItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 1}, siblingItemPositionHand1 );
      character.slots[nodeInfo.subType].items[siblingItemPositionHand1] = createrCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHand1], nodeInfo, "unAssign");
      character.slots[nodeInfo.subType].items[siblingItemPositionHand2] = createrCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHand2], nodeInfo, "unAssign");
    }
    else{
      character.slots[nodeInfo.subType].items[itemPosition] = createrCharacterSlot(item, nodeInfo, "unAssign");
    }
    store.type[character.name].asociatedItems[nodeInfo.subType].splice(storePosition, 1);
    setCharacter({...character});
    setStore({...store});
    setlistStore(<></>);
    setinfoCard(<></>);
  };
}

function useEquip(valid){
  const [character, setCharacter] = useContext(valid.isRemote ? RemoteContext : CharacterContext);
  const [store, setStore] = useContext(StoreContext);
  const [listStore, setlistStore] = useContext(StoreListContext);
  const [infoCard, setinfoCard] = useContext(InfoCardContext);
  return (nodeInfo) => {
    const itemPosition = getItemPositionBySlotId(character, nodeInfo);
    const itemPositionEliminado = getItemPositionByAsociatedId(character, nodeInfo);
    const itemAssign = character.slots[nodeInfo.subType].items[itemPosition];
    const itemUnassign = character.slots[nodeInfo.subType].items[itemPositionEliminado];
    const storePosition = getStorePosition(store, nodeInfo, {"name":character.name, "asociatedId":itemAssign.asociatedId});

    if(itemAssign.asociatedId !== -1){
      if(itemUnassign === undefined){
        character.slots[nodeInfo.subType].items[itemPositionEliminado] = createrCharacterSlot(itemAssign, {"id": itemAssign.asociatedId}, "unAssign");
        storePosition !== -1 ? store.type[character.name].asociatedItems[nodeInfo.subType].splice(storePosition, 1) : <></>;
      }
      else if(correctSlot(store.items[itemAssign.asociatedId].slots, itemUnassign !== undefined ? itemUnassign.typeSlot:-1)){
        character.slots[nodeInfo.subType].items[itemPositionEliminado] = createrCharacterSlot(itemUnassign, {"id": itemAssign.asociatedId}, "assign");
      }
      else{
        character.slots[nodeInfo.subType].items[itemPositionEliminado] = createrCharacterSlot(itemUnassign, {"id": itemAssign.asociatedId}, "unAssign");
        storePosition !== -1 ? store.type[character.name].asociatedItems[nodeInfo.subType].splice(storePosition, 1) : <></>;
      }
      if(store.items[itemAssign.asociatedId].slots[0].TypeId == 5){
        const siblingItemPositionHead = getItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 3}, -1);
        const siblingItemPositionChest = getItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "slotypeSlottId": 4}, -1);
        character.slots[nodeInfo.subType].items[siblingItemPositionHead] = createrCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHead], {"id": itemAssign.asociatedId}, "unAssign");
        character.slots[nodeInfo.subType].items[siblingItemPositionChest] = createrCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionChest], {"id": itemAssign.asociatedId}, "unAssign");
      }
      else if(store.items[itemAssign.asociatedId].slots[0].TypeId == 2){
        const siblingItemPositionHand1 = getItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 1}, -1);
        const siblingItemPositionHand2 = getItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 1}, siblingItemPositionHand1 );
        character.slots[nodeInfo.subType].items[siblingItemPositionHand1] = createrCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHand1], {"id": itemAssign.asociatedId}, "unAssign");
        character.slots[nodeInfo.subType].items[siblingItemPositionHand2] = createrCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHand2], {"id": itemAssign.asociatedId}, "unAssign");
      }
    }
    else if(itemPositionEliminado !== undefined){
      character.slots[nodeInfo.subType].items[itemPositionEliminado] = createrCharacterSlot(itemUnassign, {"id": itemAssign.asociatedId}, "unAssign");
      storePosition !== -1 ? store.type[character.name].asociatedItems[nodeInfo.subType].splice(storePosition, 1) : <></>;
    }

    if(store.items[nodeInfo.id].slots[0].TypeId == 5){
      const siblingItemPositionHead = getItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 3}, -1);
      const siblingItemPositionChest = getItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 4}, -1);
      character.slots[nodeInfo.subType].items[siblingItemPositionHead] = createrCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHead], nodeInfo, "assign");
      character.slots[nodeInfo.subType].items[siblingItemPositionChest] = createrCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionChest], nodeInfo, "assign");
    }
    else if(store.items[nodeInfo.id].slots[0].TypeId == 2){
      const siblingItemPositionHand1 = getItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 1}, -1);
      const siblingItemPositionHand2 = getItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 1}, siblingItemPositionHand1 );
      character.slots[nodeInfo.subType].items[siblingItemPositionHand1] = createrCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHand1], nodeInfo, "assign");
      character.slots[nodeInfo.subType].items[siblingItemPositionHand2] = createrCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHand2], nodeInfo, "assign");
    }
    else{
      character.slots[nodeInfo.subType].items[itemPosition] = createrCharacterSlot(itemAssign, nodeInfo, "assign");
    }

    //itemUnassign !== undefined ? character.slots[nodeInfo.subType].items[itemPositionEliminado] = createrCharacterSlot(itemUnassign, {"id": itemAssign.asociatedId}, "assign") : <></>;
    getStorePosition(store, nodeInfo, {"name":character.name, "asociatedId":nodeInfo.id}) === -1 ? store.type[character.name].asociatedItems[nodeInfo.subType].push(nodeInfo.id) : <></>;
    setCharacter({...character});
    setStore({...store});
    setlistStore(<></>);
    setinfoCard(<></>);
  };
}

function ItenModule({store, relevantId, selectHandler}){

  const activeSlot = store.items[relevantId.itemId].slots;
  const unlock = store.items[relevantId.itemId].unlock;
  const validSlot = correctSlot(activeSlot, relevantId.typeSlot);
  let itenModule = <></>;

  itenModule = activeSlot.map( slots => {
    return <div className={"typeTitle"}>{
      slots.icon.map(icon => {
        return createIcon(icon)
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

function correctSlot(activeSlot, typeSlot){
  let validate = false;

  activeSlot.map(slotInfo => {
    if(typeSlot === 1 && (slotInfo.TypeId === 1 || slotInfo.TypeId === 2)){
      validate = true;
    }
    else if(typeSlot === 3 && (slotInfo.TypeId === 3 || slotInfo.TypeId === 5)){
      validate = true;
    }
    else if(typeSlot === 4 && (slotInfo.TypeId === 4 || slotInfo.TypeId === 5)){
      validate = true;
    }
    else if(typeSlot === slotInfo.TypeId || validate){
      validate = true;
    }
  });
    

  return validate;
}

function createIcon(iconData){

    let icon;
  
    switch (iconData.type) {
      case "text": case "range":
        icon = <span className={iconData.class} >{iconData.code}</span>
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

function createrCharacterSlot(item, nodeInfo, typeAssignment){
  let newSlot = {"slotId": item.slotId, "typeSlot":item.typeSlot, "asociatedId": -1, "name": "", "info": [], "slot": item.slot};

  if(typeAssignment == "assign"){
    newSlot.asociatedId = nodeInfo.id;
    newSlot.name = item.name;
  }

  return newSlot;
}


export {ItenInfo, StoreList};
