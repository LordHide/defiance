import React from 'react';
import { CreateIcon } from '../storeManagement.js';

export function ChooseExpansion({ onCharacterChange }) {
    return <div className="expansionButtonContainer">
      <div className="expansionButton" onClick={() => onCharacterChange(true)} >
        <CreateIcon iconData={{ "type": "png", "code": "core", "class": "expansionImg" }} isActiveRange={false} />
        <div> CORE </div>
      </div>
      <div className="expansionButton" onClick={() => onCharacterChange(true)} >
        <CreateIcon iconData={{ "type": "png", "code": "outcast", "class": "expansionImg" }} isActiveRange={false} />
        <div> OUTCAST </div>
      </div>
      <div className="expansionButton" onClick={() => onCharacterChange(true)} >
        <CreateIcon iconData={{ "type": "png", "code": "revenant", "class": "expansionImg" }} isActiveRange={false} />
        <div> REVENANT </div>
      </div>
    </div>
}