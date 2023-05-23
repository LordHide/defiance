import React, {useEffect, useContext, useState} from 'react';
import { CreateIcon } from './CreateIcon.js';
import { Loading } from './Loading.js';
import UserContext from '../context/UserContext.js';
import BaseCharactersContext from '../context/baseCharactersContext.js';
import { useCharacterJsonGeneration } from '../hooks/useCharacterJsonGeneration.js';

export function ChooseExpansion({ onCharacterChange }) {
    const [isSendingLogin, setIsSendingLogin] = useState("pending");
    const [userData, setUserData] = useContext(UserContext);
    const [baseCharacters, setBaseCharacters] = useContext(BaseCharactersContext);
    const [expansion, setExpansion] = useState("");

    useEffect(() => {
      if(isSendingLogin == "send" && baseCharacters[expansion] === undefined){
        setIsSendingLogin("loading");
        let formData = new FormData();
        formData.append("token", userData.token);
        formData.append("expansion", expansion);
        fetch(
          `api/baseCharacterLoad`,
          {
            method: "POST",
            body: formData
          }
        )
        .then(res => res.json())
        .then(response => {
            setBaseCharacters(useCharacterJsonGeneration(response.baseCharacters, response.charactersSkills, expansion));
            onCharacterChange(expansion);
            setIsSendingLogin("pending");
          }
        )
        .catch((error) => {
            console.log(error);
            setIsSendingLogin("pending");
          }
        );
        }
        else if(baseCharacters[expansion] !== undefined){
          onCharacterChange(expansion);
          setIsSendingLogin("pending");
        }
      },[isSendingLogin]
    )

    return <div className="expansionButtonContainer">
      <div className="expansionButton" onClick={() => {setExpansion("Core"); setIsSendingLogin("send");}} >
        <CreateIcon iconData={{ "type": "png", "code": "core", "class": "expansionImg" }} isActiveRange={false} />
        <div> CORE </div>
      </div>
      <div className="expansionButton" onClick={() => {setExpansion("Outcast"); setIsSendingLogin("send");}} >
        <CreateIcon iconData={{ "type": "png", "code": "outcast", "class": "expansionImg" }} isActiveRange={false} />
        <div> OUTCAST </div>
      </div>
      <div className="expansionButton" onClick={() => {setExpansion("Revenant"); setIsSendingLogin("send");}} >
        <CreateIcon iconData={{ "type": "png", "code": "revenant", "class": "expansionImg" }} isActiveRange={false} />
        <div> REVENANT </div>
      </div>
      {isSendingLogin == "send" && <Loading/>}
    </div>
}