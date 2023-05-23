import React, { useContext } from 'react';
import BaseCharactersContext from '../context/baseCharactersContext.js';
import { CharacterSlot } from './CharacterSlot.js';

export function ChooseCharacter({ onProfileChange, expansion }) {
    const [baseCharacters, setBaseCharacters] = useContext(BaseCharactersContext);
    return <>
      <div className="characterdivContainer">
        {Object.values(baseCharacters[expansion]).map(character => {
          return <CharacterSlot key={character.id} character={character} onProfileChange={onProfileChange} />
        })
        }
      </div>
    </>
  }