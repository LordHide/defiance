import React from 'react';
import '../css/ProfileGlobal.css';
import '../css/inventario.css';
import {CreateIcon} from './CreateIcon.js';

export function ExtraInfo({iten}){
  let contUniq = 0;
  return <>
    <div className="extraInfo glass">{
        iten.attributes.map(info => {
            let classSwitch = info.type+"Row";
            let switchContainer = <></>;
            if(info.type == "switch"){
              classSwitch = "switchRow";
              switchContainer = 
              <div key={contUniq++} className="switchContainer">
                <div key={contUniq++} className="switchGrid" style={{"gridTemplateColumns": "repeat("+info.switch.length+", 1fr)", "gridTemplateRows":"repeat(1, 1fr)"}}>
                  {info.switch.map(iconData => {
                        return <div key={contUniq++}><CreateIcon iconData={iconData} isActiveRange={false}/></div>
                    })
                  }
                  </div>
              </div>
            }

            return <>
                <div className="infoRow"> 
                  {switchContainer}
                  <div className={classSwitch}> 
                      {info.content.map(iconData => {
                          return <CreateIcon key={contUniq++} iconData={iconData} isActiveRange={false} />
                  })}
                  </div>
                </div>
                </>
    })
    }
  </div>
  </>;
}