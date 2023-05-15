import React, {useContext} from 'react';
import CharacterContext from '../context/CharacterContext.js';
import RemoteContext from '../context/RemoteContext.js';
import {StateGeneration} from './StateGeneration.js';
import {CreateInfoContainer} from './CreateInfoContainer.js';
import {StatsHexagon} from './StatsHexagon.js';
import {CanvasSlider} from './CanvasSlider.js';
import characterImg from '../pngDispenser.js';
import '../css/ProfileGlobal.css';
import { Stage, Layer, RegularPolygon, Text, Image as ImageKonva } from 'react-konva';
//import useImage from 'use-image';

export function ProfailMain({isRemote, first}) {

  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const colorPrincipal= "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+")";
  const colorSecondary= "rgba("+character.colorSecon.R+","+character.colorSecon.G+","+character.colorSecon.B+")";
  const profileImg = characterImg(character.name);
  let contUniq = 0;


  const handleClick = (index) => {
    return () => {
        character.characterState[index].active ? 
          character.characterState[index].active = false
        :
          character.characterState[index].active = true

        setCharacter({...character})
      }
  };

  return (
      <div className="line">
        <img src={profileImg} className={first ? "character reform" : "character imgRightTransition"} alt="character" />
        <Stage className='konvanStage' width={window.innerWidth*0.62} height={window.innerWidth*0.2}>
          <Layer>
            <CharacterContext.Provider value={[character, setCharacter]}>
            <RemoteContext.Provider value={[character, setCharacter]}>
              {character.characterState.map( (info, index) => {
                return <StateGeneration info={info} index={index} handleClick={handleClick} key={contUniq++} />;
              } ) }
              <CanvasSlider imageName={"_wound"} index={0} isRemote={isRemote} />     
              <CanvasSlider imageName={"_agro"} index={1} />
              {character.stats.map( (stat) => {
                return <StatsHexagon key={contUniq++} stat={stat} colorPrincipal={colorPrincipal} colorSecondary={colorSecondary} />
              } ) }
            </RemoteContext.Provider>
            </CharacterContext.Provider>
          </Layer>
        </Stage>
        <CreateInfoContainer isRemote={isRemote} />
      </div>
  );
}