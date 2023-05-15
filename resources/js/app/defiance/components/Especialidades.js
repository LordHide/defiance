import React, {useState,useContext} from 'react';
import CharacterContext from '../context/CharacterContext.js';
import RemoteContext from '../context/RemoteContext.js';
import '../css/ProfileGlobal.css';
import '../css/Profile.css';

export function Especialidades({isRemote}){
  const [InfoContext, setInfoCardContext] = useState(<></>);
  const [ListContext, setStoreListContext] = useState(<></>);
  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const colorPrincipal= {"backgroundColor": "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+", 1)"};
  return (
    <>
      {character.slots[2].items.map((element) => {
        return (
              <GeneratePersonalItems key={element} element={element} node={"specialty"} colorPrincipal={colorPrincipal} extraClass={"Specialty"} isRemote={isRemote} typeId={2} />
        )
      })}
    </>
  );
}