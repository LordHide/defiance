import React, {useContext} from 'react';
import CharacterContext from '../context/CharacterContext.js';
import RemoteContext from '../context/RemoteContext.js';
import { useInfoCells } from '../hooks/useInfoCells.js';
import svgDispenser from '../svgDispenser.js';
import '../css/ProfileGlobal.css';
import {Text, Rect, Image as ImageKonva } from 'react-konva';

export function CanvasSlider({imageName, index, isRemote}){

  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const stat = imageName == "_wound" ? character.stats[0] : character.stats[1];
  const statValue = stat.max + stat.modifier;
  const rectY = imageName == "_wound" ? 0.04 : 0.079;
  const image = new Image();
  const handleClickSlider = (index, value, statValue) => {
    return () => {
        if( (value < 0 && character.stats[index].current > 0) ||
        (value > 0 && character.stats[index].current < statValue) ){
          character.stats[index].current += value;
        }
        setCharacter({...character});
      }
  };

  image.src = svgDispenser(imageName);

  const infoCellsList = useInfoCells(rectY, imageName, stat);

  let lasXPosition = infoCellsList[infoCellsList.length - 1].x + (window.innerWidth * 0.018) + (window.innerWidth * 0.0247) - (window.innerWidth * 0.35) + (window.innerWidth * 0.012) + (window.innerWidth * 0.0247);
  lasXPosition += window.innerWidth * 0.012;

  return(
    <>
      <Rect
        x= {window.innerWidth * 0.3}
        y= {window.innerWidth * rectY}
        width= {lasXPosition}
        height= {window.innerWidth * 0.028}
        fill={"rgba(60, 60, 60, 0.5)"}
      />
      <ImageKonva
        image={image}
        x= {window.innerWidth * 0.307}
        y= {window.innerWidth * (rectY + 0.004)}
        height= {window.innerWidth * 0.018}
        width= {window.innerWidth * 0.018}
      />
      <Text 
        text={"-"}
        x= {window.innerWidth * 0.337}
        y= {window.innerWidth * (rectY + 0.0035)}
        fontSize={window.innerWidth * 0.0247}
        fill={'#fff'}
        onClick={handleClickSlider(index, -1, statValue)}
        onTap={handleClickSlider(index, -1, statValue)}
      />
      {infoCellsList.map((info) =>{
        return <Rect key={info.height}
          x = {info.x}
          y = {info.y}
          width = {info.width}
          height = {info.height}
          fill={info.fill}
        />
      })
      }
      <Text 
        text={"+"}
        x= {lasXPosition+(window.innerWidth * 0.276)}
        y= {window.innerWidth * (rectY + 0.0035)}
        fontSize={window.innerWidth * 0.0247}
        fill={'#fff'}
        onClick={handleClickSlider(index, 1, statValue)}
        onTap={handleClickSlider(index, 1, statValue)}
      />
    </>
  );
}