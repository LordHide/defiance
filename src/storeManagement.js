import React, {useContext} from 'react';
import StoreContext from './context/storeContext.js';
import InfoCardContext from './context/InfoCardContext.js';
import svgDispenser from './svgDispenser.js';
import miniImg from './miniImgDispenser.js';
import './storeManagement.css';

function ItenInfo({nodeInfo, colorPrincipal}) {

    let cardNode = <></>;

    const [store, setStore] = useContext(StoreContext);
    const [infoCard, setinfoCard] = useContext(InfoCardContext);
    const iten = store["items"][nodeInfo.id];
    const infoHandler = () => {
      setinfoCard(<></>)
    }
    const scrollHandler = (evt) => {
      const newId = newIdHandler(evt.deltaY < 0 ? 1 : -1, store, nodeInfo);
      setinfoCard(<ItenInfo nodeInfo={{"type":nodeInfo.type, "id": newId}} colorPrincipal={colorPrincipal} />)
    };

    const keyHandler = (evt) => {
      const newId = newIdHandler(evt.code == "ArrowDown" ? -1 : 1, store, nodeInfo);
      setinfoCard(<ItenInfo nodeInfo={{"type":nodeInfo.type, "id": newId}} colorPrincipal={colorPrincipal} />)
    };

    const swHandler = (evt) => {
      const newId = newIdHandler(evt.deltaY < 0 ? 1 : -1, store, nodeInfo);
      setinfoCard(<ItenInfo nodeInfo={{"type":nodeInfo.type, "id": newId}} colorPrincipal={colorPrincipal} />)
    };


    if(nodeInfo.type !== ""){
      cardNode = <>
        <div className='infoContainerEquipment extra1'>
          <div className="titliItenInfo" style={colorPrincipal}></div>
          <div className="bodyItenInfo"></div>
        </div>
        <div className='infoContainerEquipment extra2'>
          <div className="titliItenInfo" style={colorPrincipal}></div>
          <div className="bodyItenInfo"></div>
        </div></>;
    }

    return (
      <>
        <div className='backGroundBlack' onClick={infoHandler}></div>
          {cardNode}
          <div className='infoContainerEquipment' onWheel={scrollHandler} onKeyDown={keyHandler} tabIndex={0} style={{"outline": "none"}}>
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
            </div>
        </>
    );
}

function newIdHandler(idModifier, store, nodeInfo) {
  const asociatedIndex = store.equipment[nodeInfo.type].asociatedItems;
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


export default ItenInfo;
