import React, {useState, useContext, useRef, useEffect} from 'react';
import CharacterContext from './CharacterContext.js';
import svgDispenser from './svgDispenser.js';
import trishaImg from './Img/trisha.png';
import './ProfileGlobal.css';
import './font/css/fontello.css';
import './font/css/fontello-codes.css';
import { Stage, Layer, RegularPolygon, Text, Arc, Rect, Image } from 'react-konva';
import useImage from 'use-image';

function ProfailMain() {
  const refsPolygonBright = useRef([]);
  const [character, setCharacter] = useContext(CharacterContext);
  const colorPrincipal= "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+")";
  const colorSecondary= "rgba("+character.colorSecon.R+","+character.colorSecon.G+","+character.colorSecon.B+")";

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
    refsPolygonBright.current.forEach(ref => {
      ref.cache()
    })
  }, [refsPolygonBright])

  return (
      <div className="line">
        <img src={profileImg} className="character" alt="character" />
        <Stage width={window.innerWidth*0.55} height={window.innerWidth*0.2}>
          <Layer>
            {character.characterState.map( (info, index) => {
              return stateGeneration(info, index, handleClick);
            } ) }
            { createCanvasSlider(70) }
            { createCanvasSlider(130) }
            {character.stats.map( (stat) => {
              return statsGeneration(stat, colorPrincipal, colorSecondary);
            } ) }
          </Layer>
        </Stage>
        <CreateInfoContainer />
        {character.stats.map( (stat) => {
          return <img src={svgDispenser(stat.marker)} className={stat.name+"StatIcon"} />;
        } ) }
      </div>
  );
}

function createCanvasSlider(rectY){

  return <>
    <Rect
      x= {330}
      y= {rectY}
      width= {280}
      height= {51}
      fill={"rgba(60, 60, 60, 0.5)"}
    />
  </> 
}

function stateGeneration(info, index, handleClick){
  let canvasNode;
  let alpha = info.active ? 1 : 0.5;
  let blur = info.active ? 15 : 5;
  let textColor = info.name != "oculto" ? "#FFF" : "#000";
  if(info.name != "oculto" && info.name != "inconsciente"){
    canvasNode = <RegularPolygon
      shadowColor= {'rgb('+info.color1+')'}
      shadowBlur= {blur}
      shadowOffset= {{ x: info.positionXBlur, y: info.positionYBlur }}
      shadowOpacity= {0.5}
      drawBorder= {true}
      x= {info.positionX}
      y= {info.positionY}
      rotation= {info.angle}
      sides= {3}
      radius= {80}
      fillLinearGradientStartPoint= { {x: 50, y: -70} }
      fillLinearGradientEndPoint= { {x: 50, y: 15} }
      fillLinearGradientColorStops= {[0, 'rgba('+info.color1+', '+alpha+')', 1, 'rgba('+info.color2+', '+alpha+')']}
      onClick={handleClick(index)}
    />
  }
  else{
    canvasNode = <Arc
      shadowColor= {'rgb('+info.color1+')'}
      shadowBlur= {blur}
      shadowOffset= {{ x: info.positionXBlur, y: info.positionYBlur }}
      shadowOpacity= {0.5}
      drawBorder= {true}
      angle={180}
      innerRadius={0}
      outerRadius= {60}
      x= {info.positionX}
      y= {info.positionY}
      rotation= {info.angle}
      sides= {3}
      fillLinearGradientStartPoint= { {x: 50, y: -70} }
      fillLinearGradientEndPoint= { {x: 50, y: 15} }
      fillLinearGradientColorStops= {[0, 'rgba('+info.color1+', '+alpha+')', 1, 'rgba('+info.color2+', '+alpha+')']}
      onClick={handleClick(index)}
    />
  }

  return <>
    {canvasNode}
    <Text 
      text={info.icon.text}
      fontFamily="fontello"
      x= {info.icon.x}
      y= {info.icon.y}
      fontSize={33}
      fill={textColor}
      onClick={handleClick(index)}
    />
  </> 
}

function characterImg(name){
    let imgReference;
    switch(name){
      case "trisha" : imgReference = trishaImg; break;
      default: return imgReference = trishaImg; break;
    }
  
    return imgReference;
}

function CreateInfoContainer(){

  const [character, setCharacter] = useContext(CharacterContext);
  const [infoActive, setInfoActive] = useState("EQUIPO");
  const [dataActive, setDataActive] = useState(<Equipo/>);
  const colorPrincipal= {"backgroundColor": "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+", 0.5)"}; 
  
  return (
    <>
      {character.infoContainer.map((element) => {
        let classStyle = "infoOptions";
        classStyle += element.name == infoActive ? " activo" : " deactivated";
        return (
        <div className={classStyle} onClick={() => {setInfoActive(element.name); setDataActive(cambiarInfoActive(element.name))}}>
          {element.name}
        </div>
        );
      })}
      <div style={colorPrincipal} className="infoContainer">
        <div className="contenedorGroupElements">
          {dataActive}
        </div>
        {character.personalSkill.map((skill) => {
          return (
          <div className="personalSkill">
            <div className="titleSkill">{skill.title}</div>
            <div className="textSkill">
              {skill.Content.map((content) => {
                return createIcon(content)
              })}
            </div>
          </div>
          );
        })}
      </div>
    </>
  );
}

function Equipo(){
  const [character, setCharacter] = useContext(CharacterContext);
  return (
    <>
      {character.equipment.map((element) => {
        return (
          generatePersonalItems(element, "")
        )
      })}
    </>
  );
}

function Software(){
  const [character, setCharacter] = useContext(CharacterContext);
  return (
    <>
      {character.software.map((element) => {
        return (
          generatePersonalItems(element, "")
        )
      })}
    </>
  );
}

function Especialidades(){
  const [character, setCharacter] = useContext(CharacterContext);
  return (
    <>
      {character.specialties.map((element) => {
        return (
          generatePersonalItems(element, "Specialty")
        )
      })}
    </>
  );
}

function generatePersonalItems(element, extraClass){
  return (
  <div className="contenedorInfoElement">
    <i className={element.slot}></i> 
    <div className="infoElement1" title={element.name}>
      {element.name}
    </div> 
    <div className={"infoElement2 "+extraClass}>{element.info.map(
      (iconInfo) => {
        return createIcon(iconInfo)
      }
    )}</div>
    <div className="circleInfo">
      <i>
      i
      </i>
    </div>
  </div>
  )
}

function statsGeneration(stat, colorPrincipal, colorSecondary, image){
  return (
  <>
    <RegularPolygon
      x= {stat.positionX}
      y= {stat.positionY}
      sides= {6}
      radius= {40}
      rotation= {90}
      stroke= {"rgb(112, 112, 112"}
      strokeWidth={3}
      fillLinearGradientStartPoint= { {x: 50, y: -70} }
      fillLinearGradientEndPoint= { {x: 50, y: 15} }
      fillLinearGradientColorStops= {[0, colorPrincipal, 1, colorSecondary]}
    />
  </>);
}

function createIcon(iconData){

  let icon;

  switch (iconData.type) {
    case "text":
      icon = <span>{iconData.code}</span>
      break;

    case "i":
      icon = <i className={iconData.code}></i>
      break;

    case "range":
      icon = 
      <>
        <div className="hexagon">
          <i>{iconData.code}</i>
        </div>
      </>
      break;

    case "svg": 
      icon = <img src={svgDispenser(iconData.code)} alt={iconData.code} />;
      break;
  
    default: icon = <></>
      break;
  }

  return icon;
}

function cambiarInfoActive(name){
  let content;

  switch(name){
    case "EQUIPO" : content = < Equipo />; break;
    case "SOFTWARE" :  content = < Software />; break;
    case "ESPECIALIDADES" :  content = < Especialidades />; break;
    default: content = < Equipo />; break;
  }

  return content;
}


export default ProfailMain;
