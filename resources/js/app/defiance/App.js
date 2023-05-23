import {Profile} from './components/Profile';
import {Login} from './components/login';
import React, {useState } from 'react';
import { ChooseExpansion } from './components/ChooseExpansion.js';
import { ChooseCharacter } from './components/ChooseCharacter.js';
import { Welcome } from './components/welcome.js';
import { StartMenu } from './components/startMenu.js';
import UserContext from './context/UserContext.js';
import './css/App.css';
import BaseCharactersContext from './context/baseCharactersContext.js';
import UserCharactersContext from './context/userCharactersContext.js';
import CharacterSkillsContext from './context/CharacterSkillsContext.js';

function App() {
  const [isWelcome, setIsWelcome] = useState(false);
  const [isExpansion, setIsExpansion] = useState(false);
  const [isCharacter, setIsCharacter] = useState(false);
  const [isStartMenu, setIsStartMenu] = useState(false);
  const [profile, setProfile] = useState("");
  const [currentExpansion, setCurrentExpansion] = useState("");
  const [isLogged, setLogging] = useState(true);
  const [userData, setUserData] = useState({});
  const [baseCharacters, setBaseCharacters] = useState({});
  const [userCharacters, setUserCharacters] = useState({});
  const [characterSkills, setCharacterSkills] = useState({});

  return <div className={isLogged ? "loggingApp mainApp" : "notloggingApp mainApp"}>
    <div className='backgroundCircuits'><img src='/images/circuits.png'></img></div>
    <div className='backgroundCircuits'><img src='/images/circuits.png'></img></div>
    <div className='backgroundHexagons'><img src='/images/hexagon.png'></img></div>
    <div className='backgroundHexagons'><img src='/images/hexagon.png'></img></div>
    <UserContext.Provider value={[userData, setUserData]}>
    <BaseCharactersContext.Provider value={[baseCharacters, setBaseCharacters]}>
    <UserCharactersContext.Provider value={[userCharacters, setUserCharacters]}>
    <CharacterSkillsContext.Provider value={[characterSkills, setCharacterSkills]}>
    {isLogged && <Login onUserLoad={() => {
      setLogging(false);
      setIsWelcome(true);
    }} />}
    {isWelcome && <Welcome firstLoad={true} onLoad={() => {
      setIsWelcome(false);
      setIsStartMenu(true);
    }} />}
    {isStartMenu && <StartMenu optioSelected={() => {
      setIsStartMenu(false);
      setIsExpansion(true);
    }} />}
    {isExpansion && <ChooseExpansion onCharacterChange={(selectedExpansion) => {
      setCurrentExpansion(selectedExpansion)
      setIsExpansion(false);
      setIsCharacter(true);
    }} />}
    {isCharacter && <ChooseCharacter expansion={currentExpansion} onProfileChange={(id) => {
      setIsCharacter(false);
      setProfile(id, "");
    }} />}
    {profile && <Profile id={profile} expansion={currentExpansion} returnSelection={() => {
      setProfile("", "");
      setIsExpansion(true);
    }} />}
    </CharacterSkillsContext.Provider>
    </UserCharactersContext.Provider>
    </BaseCharactersContext.Provider>
    </UserContext.Provider>
  </div>
}

export default App;
