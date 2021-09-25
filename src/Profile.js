import React, {useState, useEffect} from 'react';
import Inventario from './inventario.js';
import ProfailMain from './profailMain.js';
import trishaJSON from './Img/trisha.json';
import './ProfileGlobal.css';
import './Profile.css';


function Profile({name}) {
  const character = loadCharacter(name);
  const colorPrincipal= {"backgroundColor": "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+")"};
  const [displayContent, elegirTop] = useState("EQUIPO");

  return (
    <div>
      <div className="titliFullName" style={colorPrincipal}><h1>{character.nameFull}</h1></div>
      <div className="topButtonDiv">
        {character.subMenu.map(info => {let classutton = "topButton glass ";
          classutton += info.name == displayContent ? "active" : "deacticated";
          return <button className={classutton} onClick={() => elegirTop(info.name)}>{info.name}</button>;})}
        <button className="glass type deacticated">{character.type}</button>
      </div>
      <div className="App glass">
        {loadActiveContent(character, displayContent)}
      </div>
    </div>
  );
}

function loadCharacter(name){
  let characterJSON;
  switch(name){
    case "trisha" : characterJSON = trishaJSON; break;
  }

  return characterJSON;
}

function loadActiveContent(character, displayContent){
  let content;

  switch(displayContent){
    case "EQUIPO" : content = < ProfailMain character = {character} />; break;
    case "INVENTARIO" :  content = < Inventario character = {character} />; break;
    default: content = < ProfailMain character = {character} />; break;
  }

  return content;
}


export default Profile;
