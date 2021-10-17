import React, {useContext} from 'react';
import StoreContext from './context/storeContext.js';
import InfoCardContext from './context/InfoCardContext.js';
import svgDispenser from './svgDispenser.js';
import miniImg from './miniImgDispenser.js';
import './storeManagement.css';

function ItenInfo({node, type, id, colorPrincipal}) {
    const [store, setStore] = useContext(StoreContext);
    const [infoCard, setinfoCard] = useContext(InfoCardContext);
    const iten = store["items"][id];
    const infoHandler = () => {
      setinfoCard(<></>)
    }

    return (
      <>
        <div className='backGroundBlack' onClick={infoHandler}></div>
          <div className='infoContainerEquipment'>
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

function InfoHex({valuesHex, colorPrincipal}){
  let infohex = <></>;console.log(valuesHex.nodeHex);

  if(valuesHex.nodeHex.length != 0){
    let contentNum = valuesHex.nodeHex.filter(nodeHex => nodeHex.class == "content").length
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
  
      case "svg": /*
        if(iconData.class == "title"){
          icon = <div className={iconData.class} ><img className={iconData.class} src={svgDispenser(iconData.code)} alt={iconData.code} /></div>;
        }
        else{*/
          icon = <img className={iconData.class} src={svgDispenser(iconData.code)} alt={iconData.code} />;
        //}
        break;

      case "png": /*
        if(iconData.class == "title"){
          icon = <div className={iconData.class} ><img className={iconData.class} src={miniImg[iconData.code]} alt={iconData.code} /></div>;
        }
        else{*/
          icon = <img className={iconData.class} src={miniImg[iconData.code]} alt={iconData.code} />;
        //}
        break;
    
      default: icon = <></>
        break;
    }
  
    return icon;
  }


export default ItenInfo;
