import React, {useState, useContext, useRef, useEffect} from 'react';
import CharacterContext from './CharacterContext.js';
import trishaImg from './Img/trisha.png';
import './ProfileGlobal.css';
import './characterState.css';
import './font/css/fontello.css';
import './font/css/fontello-codes.css';
import { Stage, Layer, RegularPolygon, Text, Filters } from 'react-konva';
import Konva from 'konva'

function ProfailMain() {
  const refsPolygon = useRef([])
  const [character, setCharacter] = useContext(CharacterContext);

  const profileImg = characterImg(character.name);


  const handleClick = (index) => {
    return () => {
      character.characterState[index].active ? 
        character.characterState[index].active = false 
    : 
        character.characterState[index].active = true

        setCharacter({...character})
      }
  };

  useEffect(() => {
    refsPolygon.current.forEach(ref => {
      ref.cache()
    })
  }, [refsPolygon])

  return (
      <div className="line">
        <img src={profileImg} className="character" alt="character" />
        <Stage width={500} height={500}>
          <Layer>
            {character.characterState.map( function  callbackFn(info, index) { let alpha = info.active ? 1 : 0.2;


            return <RegularPolygon
              filters={[Konva.Filters.Blur]}
              blurRadius={20}
              x= {info.positionX}
              y= {info.positionY}
              rotation= {info.angle}
              sides= {3}
              radius= {100}
              fillLinearGradientStartPoint= { {x: 50, y: -70} }
              fillLinearGradientEndPoint= { {x: 50, y: 15} }
              fillLinearGradientColorStops= {[0, 'rgba('+info.color1+', '+alpha+')', 1, 'rgba('+info.color2+', '+alpha+')']}
              onClick={handleClick(index)}
              ref={node => {
                refsPolygon.current[index] = node
              }}
            /> } ) }
          </Layer>
        </Stage>
      </div>
  );
}

function characterImg(name){
    let imgReference;
    switch(name){
      case "trisha" : imgReference = trishaImg; break;
      default: return imgReference = trishaImg; break;
    }
  
    return imgReference;
}

function CreateCharacterState(info){
  let alpha = info.active ? 1 : 0.2;

  const handleClick = () => {
    //alpha == 1 ? elegirTop(0.5) : elegirTop(1);
  };
  return <RegularPolygon
    shadowBlur= {5}
    shadowOpacity= {0.5}
    shadowOffset= {{ x: 10, y: 10 }}
    shadowColor= {'rgba('+info.color1+', 1)'}
    x= {info.positionX}
    y= {info.positionY}
    rotation= {info.angle}
    sides= {3}
    radius= {100}
    fillLinearGradientStartPoint= { {x: 50, y: -70} }
    fillLinearGradientEndPoint= { {x: 50, y: 15} }
    fillLinearGradientColorStops= {[0, 'rgba('+info.color1+', '+alpha+')', 1, 'rgba('+info.color2+', '+alpha+')']}
    onClick={handleClick}
  />
}


export default ProfailMain;
