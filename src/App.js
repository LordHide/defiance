import Profile from './Profile';
import React, {useEffect, useState} from 'react';
import {createIcon} from './storeManagement.js';
import charactersJSON from './json/characters.json';

function App() {
  const [isLoading, setLoading] = useState(true);
  const [isExpansion, setExpansion] = useState(false);
  const [isCharacter, setCharacter] = useState(false);
  const [profile, setProfile] = useState("");

  useEffect(() => {
    setTimeout(function(){ setLoading(false); setExpansion(true) }, 3000);
  }, []);

  return <>
    {isLoading && <Loading/>}
    {isExpansion && <ChooseExpansion onCharacterChange={()=>{
      setExpansion(false);
      setCharacter(true);
    }} />}
    {isCharacter && <ChoseCharacter onProfileChange={(name)=>{
      setCharacter(false);
      setProfile(name);
    }}/>}
    {profile && <Profile name={profile}/>}
  </>
}

function Loading(){
  return <div className="loading">
    <div>
      {createIcon({"type": "png", "code": "logoDefianceImg", "class": "logoLoading"})}
      <div className="containerCircleLoading">
        {createIcon({"type": "png", "code": "loading", "class": "circleLoading"})}
      </div>
    </div>
  </div>;
}

function ChooseExpansion({onCharacterChange}){
  return <div className="expansionButtonContainer">
    <div className="expansionButton" onClick={() => onCharacterChange(true)} > 
      {createIcon({"type": "png", "code": "core", "class": "expansionImg"})} 
      <div> CORE </div> 
    </div>
    <div className="expansionButton" onClick={() => onCharacterChange(true)} > 
      {createIcon({"type": "png", "code": "outcast", "class": "expansionImg"})} 
      <div> OUTCAST </div> 
    </div>
    <div className="expansionButton" onClick={() => onCharacterChange(true)} > 
      {createIcon({"type": "png", "code": "revenant", "class": "expansionImg"})} 
      <div> REVENANT </div> 
    </div>
  </div>
}

function ChoseCharacter({onProfileChange}){
  return <div className="characterdivContainer">
    {charactersJSON.characterInfo.map((character) => {
      const colorPrincipal= {"backgroundColor": "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+")"};
      return<>
      <div style={colorPrincipal} className="characterButton" onClick={() => onProfileChange(character.name)} > 
        {createIcon({"type": "png", "code": "mini"+character.name, "class": "characterImg"})} 
        <div>{character.nameFull}</div>
      </div>
      </>
    })
    }
  </div>
}

export default App;
