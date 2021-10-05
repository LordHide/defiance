import React, {useState, createContext} from 'react';
import Inventario from './inventario.js';
import ProfailMain from './profailMain.js';
import CharacterContext from './CharacterContext.js';
import trishaJSON from './json/trisha.json';
import './ProfileGlobal.css';
import './Profile.css';

function Profile({name}) {

  const character = loadCharacter(name);
  const colorPrincipal= {"backgroundColor": "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+")"};
  const [displayContent, elegirTop] = useState("EQUIPO");

  return (
    <CharacterContext.Provider value={character}>
      <div className="titliFullName" style={colorPrincipal}><span>{character.nameFull}</span></div>
      <div className="topButtonDiv">
        {character.subMenu.map(info => {let classutton = "topButton glass ";
          classutton += info.name == displayContent ? "active" : "deacticated";
          return <button className={classutton} onClick={() => elegirTop(info.name)}>{info.name}</button>;})}
        <button className="glass type deacticated">{character.type}</button>
      </div>
      <div className="App glass">
        {loadActiveContent(displayContent)}
      </div>
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

function loadActiveContent(displayContent){
  let content;

  switch(displayContent){
    case "EQUIPO" : content = < ProfailMain />; break;
    case "INVENTARIO" :  content = < Inventario />; break;
    default: content = < Inventario />; break;
  }

  return content;
}


export default Profile;
