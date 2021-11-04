import React, {useState, useRef} from 'react';
import Inventario from './inventario.js';
import ProfailMain from './profailMain.js';
import CharacterContext from './context/CharacterContext.js';
import StoreContext from './context/storeContext.js';
import RemoteContext from './context/RemoteContext.js';
import InfoCardContext from './context/InfoCardContext.js';
import StoreListContext from './context/StoreListContext.js';
import trishaJSON from './json/trisha.json';
import rahmanJSON from './json/rahman.json';
import cadinJSON from './json/cadin.json';
import qiangJSON from './json/qiang.json';
import umaJSON from './json/uma.json';
import duchessJSON from './json/duchess.json';
import baseJSON from './json/base.json';
import './css/ProfileGlobal.css';
import './css/Profile.css';

function Profile({name}) {
  const character = loadCharacter(name);
  const [stateRemoteContext, setStateRemoteContext] = useState(loadRemote(name))
  const [stateCharacterContext, setStateCharacterContext] = useState(character)
  const [stateStoreContext, setStateStoreContext] = useState(baseJSON)
  const [InfoContext, setInfoCardContext] = useState(<></>);
  const [ListContext, setStoreListContext] = useState(<></>);
  const colorPrincipal= "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+")";
  const colorSecondary= "rgba("+character.colorSecon.R+","+character.colorSecon.G+","+character.colorSecon.B+")";
  const [displayContent, elegirTop] = useState("EQUIPO");
  const first = useRef(true);

  return (
    <CharacterContext.Provider value={[stateCharacterContext, setStateCharacterContext]}>
      <RemoteContext.Provider value={[stateRemoteContext, setStateRemoteContext]}>
      <StoreContext.Provider value={[stateStoreContext, setStateStoreContext]}>
      <InfoCardContext.Provider value={[InfoCardContext, setInfoCardContext]}>
      <StoreListContext.Provider value={[ListContext, setStoreListContext]}>
        <div className="titliFullName" style={{"background": "linear-gradient("+colorPrincipal+", "+colorSecondary+")"}}><span>{character.nameFull}</span></div>
        <div className="topButtonDiv">
          {character.subMenu.map(info => {let classutton = "topButton glass ";
            classutton += info.name == displayContent ? "active" : "deacticated";
            return <button className={classutton} onClick={() => {elegirTop(info.name); first.current = false}}>{info.name}</button>;})}
          <button className="glass type deacticated">{character.type}</button>
        </div>
        <div className="App glass">
          {loadActiveContent(displayContent, character, first.current)}
        </div>
        {ListContext}
        {InfoContext}
      </StoreListContext.Provider>
      </InfoCardContext.Provider>
      </StoreContext.Provider>
      </RemoteContext.Provider>
    </CharacterContext.Provider>
  );
}

function loadCharacter(name){
  let characterJSON;
  switch(name){
    case "Trisha" : characterJSON = trishaJSON; break;
    case "uma" : characterJSON = umaJSON; break;
    case "qiang" : characterJSON = qiangJSON; break;
    case "Cadin" : characterJSON = cadinJSON; break;
    case "rahman" : characterJSON = rahmanJSON; break;
  }

  return characterJSON;
}

function loadRemote(name){
  let characterJSON;
  switch(name){
    case "Trisha" : characterJSON = duchessJSON; break;
  }

  return characterJSON;
}

function loadActiveContent(displayContent, character, first){
  let content;

  switch(displayContent){
    case "EQUIPO" : content = < ProfailMain isRemote={false} first={first} />; break;
    case "INVENTARIO" :  content = < Inventario first={first} />; break;
    case "REMOTO" :  content = < ProfailMain isRemote={true} remote={character.Remote} first={first} />; break;
    default: content = < Inventario />; break;
  }

  return content;
}


export default Profile;
