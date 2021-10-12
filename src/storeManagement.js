import React, {useContext} from 'react';
import StoreContext from './storeContext.js';
import svgDispenser from './svgDispenser.js';
import './storeManagement.css';

function ItenInfo({node, type, id, colorPrincipal}) {
    const [store, setStore] = useContext(StoreContext);
    const iten = store[node][type][id];

    return (
        <div className='backGroundBlack'>
          <div className='infoContainerEquipment'>
            <div className="titliItenInfo" style={colorPrincipal}><span>{iten.name}</span></div>
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
                  <div className="extraInfo glass">{
                      iten.attributes.map(info => {
                          let classSwich = "";
                          if(info.attributes){

                          }
                          return (
                              <div className={classSwich}> 
                                  {info.map(iconData => {
                                      return createIcon(iconData)
                              })}
                              </div>)
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
