import React, {useContext, useState} from 'react';
import CharacterContext from '../context/CharacterContext.js';
import {useCambiarInfoActive} from '../hooks/useCambiarInfoActive.js';
import {PersonalSkills} from './PersonalSkills.js';
import '../css/ProfileGlobal.css';

export function CreateInfoContainer({isRemote}){

  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const currentData = useCambiarInfoActive(character.infoContainer[0].name, isRemote);
  const [infoActive, setInfoActive] = useState(character.infoContainer[0].name);
  const [dataActive, setDataActive] = useState(currentData);
  const colorPrincipal= "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+", 0.5)";
  const colorSecondary= "rgba("+character.colorSecon.R+","+character.colorSecon.G+","+character.colorSecon.B+", 0.5)";
  let contUniq = 0;
  
  return (
    <>
      {character.infoContainer.map((element) => {
        let classStyle = "infoOptions";
        classStyle += element.name == infoActive ? " activo" : " deactivated";
        return (
        <div key={element.name} className={classStyle} onClick={() => {setInfoActive(element.name); setDataActive(useCambiarInfoActive(element.name, isRemote))}}>
          {element.name}
        </div>
        );
      })}
      <div style={{"background": "linear-gradient("+colorPrincipal+", "+colorSecondary+")"}} className="infoContainer">
        <div className="contenedorGroupElements">
          {dataActive}
        </div>
        {character.personalSkill.map((skill) => {
          return <PersonalSkills key={contUniq++} skill={skill}/>
        })}
      </div>
    </>
  );
}