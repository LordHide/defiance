import Profile from './Profile';
import React, {useEffect, useState} from 'react';
import {createIcon} from './storeManagement.js';
//<button onClick={() => elegirpersonaje(< Profile name="trisha"/>)} > trisha </button>
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
  return <>
    <button onClick={() => onCharacterChange(true)} > Default </button>
    <button onClick={() => onCharacterChange(true)} > Outcast </button>
    <button onClick={() => onCharacterChange(true)} > Revenant </button>
  </>
}

function ChoseCharacter({onProfileChange}){
  return <button onClick={() => onProfileChange("trisha")} > trisha </button>
}

export default App;
