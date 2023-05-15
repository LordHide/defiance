import React, {useState,useContext} from 'react';
import CharacterContext from '../context/CharacterContext.js';
import RemoteContext from '../context/RemoteContext.js';
import {GeneratePersonalItems} from './GeneratePersonalItems.js';
import '../css/ProfileGlobal.css';
import '../css/Profile.css';

export function Equipo({isRemote}){
  const [InfoContext, setInfoCardContext] = useState(<></>);
  const [ListContext, setStoreListContext] = useState(<></>);
  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const colorPrincipal= {"backgroundColor": "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+", 1)"};
  let contUniq = 0;
  return (
    <>
      {character.slots[0].items.map((element) => {
        return (
              <GeneratePersonalItems key={contUniq++} element={element} node={"equipment"} colorPrincipal={colorPrincipal} extraClass={""} typeId={0} />
        )
      })}
    </>
  );
}