import React, {useContext} from 'react';
import StoreContext from './context/storeContext.js';
import InfoCardContext from './context/InfoCardContext.js';
import svgDispenser from './svgDispenser.js';
import './storeManagement.css';

function ItenInfo({node, type, id, colorPrincipal}) {
    const [store, setStore] = useContext(StoreContext);
    const [infoCard, setinfoCard] = useContext(InfoCardContext);
    const iten = store[node][type][id];
    const infoHandler = () => {
      setinfoCard(<></>)
    }

    return (
        <div className='backGroundBlack'>
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
                  <div className="range" style={colorPrincipal}><span>{iten.range}</span></div>
                  <div className="cost" style={colorPrincipal}>{
                      iten.cost.map(info => {
                          return <div className={info.type}>{createIcon(info)}</div>})
                      }
                  </div>
                  <div className="damage" style={colorPrincipal}>
                    <span>
                      {iten.values.map(info => {
                          return createIcon(info)
                      })}
                    </span>
                  </div>
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
        </div>
    );
}

function createIcon(iconData){

    let icon;
  
    switch (iconData.type) {
      case "text":
        icon = <span>{iconData.code}</span>
        break;
  
      case "i":
        icon = <i className={iconData.code}></i>
        break;
  
      case "range":
        icon = 
        <>
          <div className="hexagon">
            <i>{iconData.code}</i>
          </div>
        </>
        break;
  
      case "svg": 
        icon = <img src={svgDispenser(iconData.code)} alt={iconData.code} />;
        break;
    
      default: icon = <></>
        break;
    }
  
    return icon;
  }


export default ItenInfo;
