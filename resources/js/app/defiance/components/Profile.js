import React, {useState,useContext, useRef} from 'react';
import CharacterContext from '../context/CharacterContext.js';
import StoreContext from '../context/StoreContext.js';
import RemoteContext from '../context/RemoteContext.js';
import InfoCardContext from '../context/InfoCardContext.js';
import StoreListContext from '../context/StoreListContext.js';
import { useLoadActiveContent } from '../hooks/useLoadActiveContent.js';
import baseJSON from '../json/base.json';
import BaseCharactersContext from '../context/baseCharactersContext.js';
import '../css/ProfileGlobal.css';
import '../css/Profile.css';

export function Profile({id}) {
  const [baseCharacters, setBaseCharacters] = useContext(BaseCharactersContext);
  const character = baseCharacters[id];
  const [stateRemoteContext, setStateRemoteContext] = useState(id)
  const [stateCharacterContext, setStateCharacterContext] = useState(character)
  const [stateStoreContext, setStateStoreContext] = useState(baseJSON)
  const [InfoContext, setInfoCardContext] = useState(<></>);
  const [ListContext, setStoreListContext] = useState(<></>);
  const colorPrincipal= "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+", 0.6)";
  const colorSecondary= "rgba("+character.colorSecon.R+","+character.colorSecon.G+","+character.colorSecon.B+", 0.6)";
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
            return <button key={info.name} className={classutton} onClick={() => {elegirTop(info.name); first.current = false}}>{info.name}</button>;})}
          <button className="glass type deacticated">{character.type}</button>
        </div>
        <div className="App glass">
          {useLoadActiveContent(displayContent, character, first.current)}
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