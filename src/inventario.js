import React, {useState, useContext} from 'react';
import CharacterContext from './context/CharacterContext.js';
import StoreContext from './context/storeContext.js';
import {ItenInfo, StoreList} from './storeManagement.js';
import RemoteContext from './context/RemoteContext.js';
import InfoCardContext from './context/InfoCardContext.js';
import StoreListContext from './context/StoreListContext.js';
import svgDispenser from './svgDispenser.js';
import characterImg from './pngDispenser.js';
import './ProfileGlobal.css';
import './inventario.css';

function Inventario({isRemote}) {

  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const colorPrincipal= +character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B;
  const colorSecondary= "rgba("+character.colorSecon.R+","+character.colorSecon.G+","+character.colorSecon.B+")";
  const profileImg = characterImg(character.name);

  return (
      <div className="Inventory">
        <img src={profileImg} className="character" alt="character" />
        {character.slots[0].items.map( (info, index) => {
                return<>
                  <div className={"hexagon slot type"+info.typeSlot} style={{"backgroundColor": "rgba("+colorPrincipal+", 1)"}}></div>
                  <div className={"hexagon slotType type"+info.typeSlot} style={{"backgroundColor": "rgba("+colorPrincipal+", 1)"}}></div>
                </>
              } ) 
        }
        <div className={"softwareTitle"} style={{"backgroundColor": "rgba("+colorPrincipal+", 1)"}}>Software</div>
        <div className={"software"} style={{"backgroundColor": "rgba("+colorPrincipal+", 0.6)"}}></div>
      </div>
  );
}

export default Inventario;
