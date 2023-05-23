import React, {useEffect, useContext} from 'react';
import { CreateIcon } from './CreateIcon.js';
import '../css/components/login.css';
import UserContext from '../context/UserContext.js';
import UserCharactersContext from '../context/userCharactersContext.js';
import CharacterSkillsContext from '../context/CharacterSkillsContext.js';

export function Welcome({ firstLoad, onLoad }) {

  const [userData, setUserData] = useContext(UserContext);
  const [userCharacters, setUserCharacters] = useContext(UserCharactersContext);
  const [characterSkills, setCharacterSkills] = useContext(CharacterSkillsContext);

  useEffect(() => {
      let formData = new FormData();
      formData.append("token", userData.token);
      formData.append("userCharactersLimit", 10);
      fetch(
        `api/firstCharacterLoad`,
        {
          method: "POST",
          body: formData
        }
      )
      .then(res => res.json())
      .then(response => {
          setCharacterSkills(response.charactersSkills);
          setUserCharacters(response.userCharacters);
          onLoad();
        }
      )
      .catch((error) => {
          console.log(error);
        }
      );
    },[]
  )

  return <div className="loading">
    <div>
      {firstLoad && <p className='welcomeSing transAparition'>Welcome{userData.name}</p>}
      <CreateIcon iconData={{ "type": "png", "code": "logoDefianceImg", "class": "logoLoading transAparition" }} isActiveRange={false} />
      <div className="containerCircleLoading">
      </div>
    </div>
  </div>;
}