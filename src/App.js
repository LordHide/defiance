import Profile from './Profile';
import React, {useEffect, useState} from 'react';
import {CreateIcon} from './storeManagement.js';
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
      <CreateIcon iconData={{"type": "png", "code": "logoDefianceImg", "class": "logoLoading"}} isActiveRange={false}/>
      <div className="containerCircleLoading">
        <CreateIcon iconData={{"type": "png", "code": "loading", "class": "circleLoading"}} isActiveRange={false}/>
      </div>
    </div>
  </div>;
}

function ChooseExpansion({onCharacterChange}){
  return <div className="expansionButtonContainer">
    <div className="expansionButton" onClick={() => onCharacterChange(true)} > 
      <CreateIcon iconData={{"type": "png", "code": "core", "class": "expansionImg"}} isActiveRange={false}/>
      <div> CORE </div> 
    </div>
    <div className="expansionButton" onClick={() => onCharacterChange(true)} > 
      <CreateIcon iconData={{"type": "png", "code": "outcast", "class": "expansionImg"}} isActiveRange={false}/>
      <div> OUTCAST </div> 
    </div>
    <div className="expansionButton" onClick={() => onCharacterChange(true)} > 
      <CreateIcon iconData={{"type": "png", "code": "revenant", "class": "expansionImg"}} isActiveRange={false}/>
      <div> REVENANT </div> 
    </div>
  </div>
}

function ChoseCharacter({onProfileChange}){
  return <>
    <div className="characterdivContainer">
      {charactersJSON.characterInfo.map((character) => {
        return <CharacterSlot character={character} onProfileChange={onProfileChange} />
      })
      }
    </div>
  </>
}

function CharacterSlot({character, onProfileChange}){
  const [clipPath, setclipPath] = useState({clipPath: "polygon(0 50%, 50% 100%, 100% 50%, 50% 0 )", opacity: "0.65"});

  const imagenCharacter = detectMob() ? "mini"+character.name : character.name.toLowerCase();
  const colorPrincipal= "rgb("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+")";
  const colorSecondary= "rgb("+character.colorSecon.R+","+character.colorSecon.G+","+character.colorSecon.B+")";
  return<div 
    style={
      {filter: "drop-shadow(-12px 26px 3px rgba(50, 50, 0, 0.5))",
      width: "15vw",
      height: "75vh"}}
    onMouseOver={()=>{setclipPath({clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: "1"})}}
    onMouseLeave={()=>{setclipPath({clipPath:"polygon(0 50%, 50% 100%, 100% 50%, 50% 0 )", opacity: "0.65"})}}>
    <div style={{"background": "linear-gradient("+colorPrincipal+", "+colorSecondary+")", ...clipPath}} className="characterButton" onClick={() => onProfileChange(character.name)} > 
      <CreateIcon iconData={{"type": "png", "code": imagenCharacter, "class": "characterImg"}} isActiveRange={false}/>
      <div>{character.nameFull}</div>
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

export default App;
