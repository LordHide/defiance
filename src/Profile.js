import React, {useState} from 'react';
import Inventario from './inventario.js';
import ProfailMain from './profailMain.js';
import CharacterContext from './context/CharacterContext.js';
import StoreContext from './context/storeContext.js';
import RemoteContext from './context/RemoteContext.js';
import InfoCardContext from './context/InfoCardContext.js';
import StoreListContext from './context/StoreListContext.js';
import trishaJSON from './json/trisha.json';
import duchessJSON from './json/duchess.json';
import baseJSON from './json/base.json';
import './ProfileGlobal.css';
import './Profile.css';

function Profile({name}) {
  const character = loadCharacter(name);
  const [stateRemoteContext, setStateRemoteContext] = useState(loadRemote(name))
  const [stateCharacterContext, setStateCharacterContext] = useState(character)
  const [stateStoreContext, setStateStoreContext] = useState(baseJSON)
  const [InfoContext, setInfoCardContext] = useState(<></>);
  const [ListContext, setStoreListContext] = useState(<></>);
  const colorPrincipal= {"backgroundColor": "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+")"};
  const [displayContent, elegirTop] = useState("EQUIPO");

  return (
    <CharacterContext.Provider value={[stateCharacterContext, setStateCharacterContext]}>
      <RemoteContext.Provider value={[stateRemoteContext, setStateRemoteContext]}>
      <StoreContext.Provider value={[stateStoreContext, setStateStoreContext]}>
      <InfoCardContext.Provider value={[InfoCardContext, setInfoCardContext]}>
      <StoreListContext.Provider value={[ListContext, setStoreListContext]}>
        <div className="titliFullName" style={colorPrincipal}><span>{character.nameFull}</span></div>
        <div className="topButtonDiv">
          {character.subMenu.map(info => {let classutton = "topButton glass ";
            classutton += info.name == displayContent ? "active" : "deacticated";
            return <button className={classutton} onClick={() => elegirTop(info.name)}>{info.name}</button>;})}
          <button className="glass type deacticated">{character.type}</button>
        </div>
        <div className="App glass">
          {loadActiveContent(displayContent, character)}
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
    case "trisha" : characterJSON = trishaJSON; break;
  }

  return characterJSON;
}

function loadRemote(name){
  let characterJSON;
  switch(name){
    case "trisha" : characterJSON = duchessJSON; break;
  }

  return characterJSON;
}

function loadActiveContent(displayContent, character){
  let content;

  switch(displayContent){
    case "EQUIPO" : content = < ProfailMain isRemote={false} />; break;
    case "INVENTARIO" :  content = < Inventario />; break;
    case "REMOTO" :  content = < ProfailMain isRemote={true} remote={character.Remote} />; break;
    default: content = < Inventario />; break;
  }

  return content;
}


export default Profile;
