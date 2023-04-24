import React, { useState } from 'react';
import { CreateIcon } from '../storeManagement.js';

export function CharacterSlot({ character, onProfileChange, contador }) {
    const [clipPath, setClipPath] = useState({ clipPath: "polygon(0 50%, 50% 100%, 100% 50%, 50% 0 )", opacity: "0.65" });
    const imagenCharacter = detectMob() ? "mini" + character.name : character.name.toLowerCase();
    const colorPrincipal = "rgb(" + character.colorPrime.R + "," + character.colorPrime.G + "," + character.colorPrime.B + ")";
    const colorSecondary = "rgb(" + character.colorSecon.R + "," + character.colorSecon.G + "," + character.colorSecon.B + ")";
    return <div key={contador}
      style={
        {
          filter: "drop-shadow(-12px 26px 3px rgba(50, 50, 0, 0.5))",
          width: "15vw",
          height: "75vh"
        }}
      onMouseOver={() => { setClipPath({ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: "1" }) }}
      onMouseLeave={() => { setClipPath({ clipPath: "polygon(0 50%, 50% 100%, 100% 50%, 50% 0 )", opacity: "0.65" }) }}>
      <div key={contador} style={{ "background": "linear-gradient(" + colorPrincipal + ", " + colorSecondary + ")", ...clipPath }} className="characterButton" onClick={() => onProfileChange(character.id)} >
        <CreateIcon iconData={{ "type": "png", "code": imagenCharacter, "class": "characterImg" }} isActiveRange={false} />
        <div key={contador}>{character.nameFull}</div>
      </div>
    </div>
  }
  
  function detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
  
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }