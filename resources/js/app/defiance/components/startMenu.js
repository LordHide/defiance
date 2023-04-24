import React, {useContext} from 'react';
import '../css/components/startMenu.css';
import UserCharactersContext from '../context/userCharactersContext.js';

export function StartMenu({optioSelected}) {

  const [userCharacters, setUserCharacters] = useContext(UserCharactersContext);
  let hasCharacter = userCharacters.length == 0;

  return <div className='startMenu'>
      <button className='buttonsStartMenu' disabled={hasCharacter} onClick={() => optioSelected(!hasCharacter)}>Load Character</button>
      <button className='buttonsStartMenu' onClick={() => optioSelected(true)}>New Character</button>
    </div>;
}