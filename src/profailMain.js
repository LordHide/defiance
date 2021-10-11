import React, {useState, useContext, useRef, useEffect} from 'react';
import CharacterContext from './CharacterContext.js';
import svgDispenser from './svgDispenser.js';
import trishaImg from './Img/trisha.png';
import './ProfileGlobal.css';
import './font/css/fontello.css';
import './font/css/fontello-codes.css';
import { Stage, Layer, RegularPolygon, Text, Arc, Rect, Image as ImageKonva } from 'react-konva';
//import useImage from 'use-image';

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
        <Stage width={window.innerWidth*0.62} height={window.innerWidth*0.2}>
          <Layer>
            <CharacterContext.Provider value={[character, setCharacter]}>
              {character.characterState.map( (info, index) => {
                return stateGeneration(info, index, handleClick);
              } ) }
              <CreateCanvasSlider imageName={"herida"} />
              <CreateCanvasSlider imageName={"agro"} />
              {character.stats.map( (stat) => {
                return statsGeneration(stat, colorPrincipal, colorSecondary);
              } ) }
            </CharacterContext.Provider>
          </Layer>
        </Stage>
        <CreateInfoContainer />
      </div>
  );
}

function CreateCanvasSlider({imageName}){

  const [character, setCharacter] = useContext(CharacterContext);
  const stat = imageName == "herida" ? character.stats[0] : character.stats[1]
  const rectY = imageName == "herida" ? 0.04 : 0.079;
  const image = new Image();
  image.src = svgDispenser(imageName);

  let cells = [];
  let cellX = window.innerWidth * 0.35;
  let cellHeight = (window.innerWidth * 0.024)/(stat.max + stat.modifier);

  for (let index = 1; index <= (stat.max + stat.modifier); index++) {
    cells.push(<Rect
      x= {cellX}
      y= {window.innerWidth * (rectY + 0.002)}
      width= {window.innerWidth * 0.009}
      height= {cellHeight}
      fill={"rgba(60, 60, 60, 0.5)"}
    />);
    
    cellX += window.innerWidth * 0.012;
    cellHeight += (window.innerWidth * 0.024)/index;

  }

  cellX += (window.innerWidth * 0.018) + (window.innerWidth * 0.0247) - (window.innerWidth * 0.35) + (window.innerWidth * 0.012) + (window.innerWidth * 0.0247);

  return(
    <>
      <Rect
        x= {window.innerWidth * 0.3}
        y= {window.innerWidth * rectY}
        width= {cellX}
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
      />
      {cells}
      <Text 
        text={"+"}
        x= {window.innerWidth * 0.415}
        y= {window.innerWidth * (rectY + 0.0035)}
        fontSize={window.innerWidth * 0.0247}
        fill={'#fff'}
      />
    </>
  );
}

function stateGeneration(info, index, handleClick){
  let canvasNode;
  let alpha = info.active ? 1 : 0.5;
  let blur = info.active ? 15 : 5;
  let textColor = info.name != "oculto" ? "#FFF" : "#000";
  const image = new Image();
  image.src = svgDispenser(info.icon.text);

  if(info.name != "oculto" && info.name != "inconsciente"){
    canvasNode = <RegularPolygon
      shadowColor= {'rgb('+info.color1+')'}
      shadowBlur= {blur}
      shadowOffset= {{ x: info.positionXBlur, y: info.positionYBlur }}
      shadowOpacity= {0.5}
      drawBorder= {true}
      x= {window.innerWidth * (info.positionX)}
      y= {window.innerWidth * (info.positionY)}
      rotation= {info.angle}
      sides= {3}
      radius= {window.innerWidth * (0.04058)}
      fillLinearGradientStartPoint= { {x: 50, y: -70} }
      fillLinearGradientEndPoint= { {x: 50, y: 15} }
      fillLinearGradientColorStops= {[0, 'rgba('+info.color1+', '+alpha+')', 1, 'rgba('+info.color2+', '+alpha+')']}
      onClick={handleClick(index)}
      onTap={handleClick(index)}
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
      outerRadius= {window.innerWidth * 0.0288}
      x= {window.innerWidth * info.positionX}
      y= {window.innerWidth * (info.positionY)}
      rotation= {info.angle}
      fillLinearGradientStartPoint= { {x: 50, y: -70} }
      fillLinearGradientEndPoint= { {x: 50, y: 15} }
      fillLinearGradientColorStops= {[0, 'rgba('+info.color1+', '+alpha+')', 1, 'rgba('+info.color2+', '+alpha+')']}
      onClick={handleClick(index)}
      onTap={handleClick(index)}
    />
  }

  return <>
    {canvasNode}
    <ImageKonva
      image={image}
      x= {window.innerWidth * info.icon.x}
      y= {window.innerWidth * info.icon.y}
      height= {window.innerWidth * 0.018}
      width= {window.innerWidth * 0.018}
      onClick={handleClick(index)}
      onTap={handleClick(index)}
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
      <div>{element.name}</div>
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

function statsGeneration(stat, colorPrincipal, colorSecondary){
  let contentComponent = <></>;
  const componentX = window.innerWidth * stat.positionX;
  const componentY = window.innerWidth * stat.positionY;
  const contentWidth = window.innerWidth*0.016;
  const image = new Image();
  image.src = svgDispenser(stat.marker);

  if (typeof (stat.max) === "object") {
    let imagePositionX = (componentX + contentWidth*0.8);
    contentComponent =  stat.max.map( (maxData) => {
      const imageData = new Image();
      imagePositionX = imagePositionX-((contentWidth*0.8));
      imageData.src = svgDispenser(maxData.code);
      return (
        <ImageKonva
          image={imageData}
          x= {(imagePositionX)}
          y= {(componentY + (window.innerWidth*0.00396))}
          height= {contentWidth*0.75}
          width= {contentWidth*0.75}
        />);
    })
   
  }
  else{
  contentComponent = 
    <Text 
      text={stat.max}
      x= {componentX - (contentWidth)/3.7}
      y= {(componentY + (window.innerWidth*0.00396))}
      fontSize={contentWidth}
      fill={'#fff'}
    />;
  }

  return (
  <>
    <RegularPolygon
      x= {componentX}
      y= {componentY}
      sides= {6}
      radius= {window.innerWidth*0.022}
      rotation= {90}
      stroke= {"rgb(112, 112, 112"}
      strokeWidth={3}
      fillLinearGradientStartPoint= { {x: 50, y: -70} }
      fillLinearGradientEndPoint= { {x: 50, y: 15} }
      fillLinearGradientColorStops= {[0, colorPrincipal, 1, colorSecondary]}
    />
    <ImageKonva
      image={image}
      x= {componentX - (contentWidth)/2}
      y= {componentY - contentWidth}
      height= {contentWidth}
      width= {contentWidth}
    />
    {contentComponent}
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