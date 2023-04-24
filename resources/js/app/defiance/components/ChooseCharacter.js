import React, { useContext } from 'react';
import BaseCharactersContext from '../context/baseCharactersContext.js';
import { CharacterSlot } from './CharacterSlot.js';

export function ChooseCharacter({ onProfileChange }) {
    const [baseCharacters, setBaseCharacters] = useContext(BaseCharactersContext);
    let contador = 0;
    return <>
      <div className="characterdivContainer">
        {Object.values(baseCharacters).map(character => {
          return <CharacterSlot character={character} onProfileChange={onProfileChange} contador={contador++} />
        })
        }
      </div>
    </>
  }