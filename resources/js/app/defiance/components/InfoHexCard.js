import React from 'react';
import '../css/ProfileGlobal.css';
import '../css/inventario.css';
import {CreateIcon} from './CreateIcon.js';

export function InfoHexCard({valuesHex, style}){
  let infohex = <></>;
  let contUniq = 0;

  if(valuesHex.nodeHex.length != 0){
    let contentNum = valuesHex.nodeHex.filter(nodeHex => nodeHex.class == "content" ||  nodeHex.class == "miniAvatar").length
    let gridColumns = {"gridTemplateColumns": "repeat("+contentNum+", 1fr)", "gridTemplateRows": valuesHex.nodeHex[0].class == "title" ? "57% 30%" : "100% 30%"};

    infohex = <div className={valuesHex.nameHex} style={style}>
    <div className="gridHex" style={gridColumns}>
      {valuesHex.nodeHex.map(info => {
            return <div key={contUniq++} className={info.type+""+info.class}>{<CreateIcon iconData={info} isActiveRange={false} />}</div>
        })
      }
      </div>
    </div>
  }

  return infohex;
}