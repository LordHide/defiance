import React from 'react';
import { CreateIcon } from './CreateIcon.js';

export function Loading() {
    return <div className="expansionButtonContainer">
      <div className="expansionButton" onClick={() => {setExpansion("Revenant"); setIsSendingLogin("send");}} >
        <CreateIcon iconData={{ "type": "png", "code": "revenant", "class": "expansionImg" }} isActiveRange={false} />
        <div> REVENANT </div>
      </div>
    </div>
}