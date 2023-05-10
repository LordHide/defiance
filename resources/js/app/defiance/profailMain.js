import React, {useState, useContext, useRef} from 'react';
import CharacterContext from './context/CharacterContext.js';
import StoreContext from './context/storeContext.js';
import {ItenInfo, StoreList} from './storeManagement.js';
import RemoteContext from './context/RemoteContext.js';
import InfoCardContext from './context/InfoCardContext.js';
import StoreListContext from './context/StoreListContext.js';
import {CreateIcon} from './storeManagement.js';
import svgDispenser from './svgDispenser.js';
import characterImg from './pngDispenser.js';
import './css/ProfileGlobal.css';
import { Stage, Layer, RegularPolygon, Text, Arc, Rect, Image as ImageKonva } from 'react-konva';
//import useImage from 'use-image';

function ProfailMain({isRemote, first}) {

  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
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

  return (
      <div className="line">
        <img src={profileImg} className={first ? "character reform" : "character imgRightTransition"} alt="character" />
        <Stage className='konvanStage' width={window.innerWidth*0.62} height={window.innerWidth*0.2}>
          <Layer>
            <CharacterContext.Provider value={[character, setCharacter]}>
            <RemoteContext.Provider value={[character, setCharacter]}>
              {character.characterState.map( (info, index) => {
                return stateGeneration(info, index, handleClick);
              } ) }
              <CanvasSlider imageName={"_wound"} index={0} isRemote={isRemote} />     
              <CanvasSlider imageName={"_agro"} index={1} />
              {character.stats.map( (stat) => {
                return <StatsHexagon key={stat} stat={stat} colorPrincipal={colorPrincipal} colorSecondary={colorSecondary} />
              } ) }
            </RemoteContext.Provider>
            </CharacterContext.Provider>
          </Layer>
        </Stage>
        <CreateInfoContainer isRemote={isRemote} />
      </div>
  );
}

function CanvasSlider({imageName, index, isRemote}){

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

  const infoCellsList = infoCells(rectY, imageName, stat);

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

function infoCells(rectY, imageName, stat){
  const statValue = stat.max + stat.modifier;

  let info = [];
  let cellX = window.innerWidth * 0.35;
  let cellHeight = (window.innerWidth * 0.024)/(statValue);
  let redDeferencial = 0;
  let greenDeferencial = 0;
  let blueDeferencial = 0;

  for (let index = 1; index <= (statValue); index++) {

    redDeferencial += (243 - 50)/statValue;
    greenDeferencial += (37 - 212)/statValue;
    blueDeferencial += (51 - 77)/statValue;

    let colorTransition = imageName == "herida" ? 
      "rgb("+(243 - redDeferencial)+","+ (37 - greenDeferencial)+"," +(51 - blueDeferencial)+")"
    :
      "rgb("+(50 + redDeferencial)+","+ (212 + greenDeferencial)+"," +(77 + blueDeferencial)+")";

    const colorActive = index <= stat.current ? colorTransition : "rgb(60, 60, 60)";

    info.push({"x":cellX,
      "y":window.innerWidth * ((rectY + 0.002))+(window.innerWidth * 0.024 - cellHeight),
      "width": window.innerWidth * 0.009,
      "height":cellHeight,
      "fill":colorActive});
    
    cellX += window.innerWidth * 0.012;
    cellHeight += (window.innerWidth * 0.024)/statValue;

  }

  return info;
}

function stateGeneration(info, index, handleClick){
  const image = new Image();
  image.src = svgDispenser(info.icon.text);

  return <>
    <StatePoligon info={info} index={index} handleClick={handleClick} />
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

function StatePoligon({info, index, handleClick}){

  let canvasNode = <></>;

  const infoJson = getStatePoligonConf(info, index, handleClick);

  if(info.name != "oculto" && info.name != "inconsciente"){
    canvasNode = <RegularPolygon
      {...infoJson}
      sides= {3}
      radius= {window.innerWidth * (0.04058)}
    />
  }
  else{
    canvasNode = <Arc
      {...infoJson}
      angle={180}
      innerRadius={0}
      outerRadius= {window.innerWidth * 0.0288}
    />
  }

  return canvasNode;
}

function getStatePoligonConf(info, index, handleClick){
  let alpha = info.active ? 1 : 0.5;
  let blur = info.active ? 15 : 5;
  return {"shadowColor": 'rgb('+info.color1+')',
    "shadowBlur": blur,
    "shadowOffset": { x: info.positionXBlur, y: info.positionYBlur },
    "shadowOpacity": 0.5,
    "drawBorder": true,
    "rotation": info.angle,
    "y": window.innerWidth * (info.positionY),
    "x": window.innerWidth * (info.positionX),
    "fillLinearGradientStartPoint": {x: 50, y: -70},
    "fillLinearGradientEndPoint": {x: 50, y: 15},
    "fillLinearGradientColorStops": [0, 'rgba('+info.color1+', '+alpha+')', 1, 'rgba('+info.color2+', '+alpha+')'],
    "onClick": handleClick(index),
    "onTap": handleClick(index)
  };
}

function CreateInfoContainer({isRemote}){

  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const [infoActive, setInfoActive] = useState(character.infoContainer[0].name);
  const [dataActive, setDataActive] = useState(cambiarInfoActive(character.infoContainer[0].name, isRemote));
  const colorPrincipal= "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+", 0.5)";
  const colorSecondary= "rgba("+character.colorSecon.R+","+character.colorSecon.G+","+character.colorSecon.B+", 0.5)";
  
  return (
    <>
      {character.infoContainer.map((element) => {
        let classStyle = "infoOptions";
        classStyle += element.name == infoActive ? " activo" : " deactivated";
        return (
        <div key={element.name} className={classStyle} onClick={() => {setInfoActive(element.name); setDataActive(cambiarInfoActive(element.name, isRemote))}}>
          {element.name}
        </div>
        );
      })}
      <div style={{"background": "linear-gradient("+colorPrincipal+", "+colorSecondary+")"}} className="infoContainer">
        <div className="contenedorGroupElements">
          {dataActive}
        </div>
        {character.personalSkill.map((skill) => {
          return <PersonalSkills key={skill} skill={skill}/>
        })}
      </div>
    </>
  );
}

function PersonalSkills({skill}){
  return <div className="personalSkill">
          <div className="titleSkill">{skill.title}</div>
          <div className="textSkill">
            {skill.Content.map((content) => {
              return <CreateIcon key={content} iconData={content} isActiveRange={true}/>
            })}
          </div>
        </div>
}

function cambiarInfoActive(name, isRemote){
  let content;

  switch(name){
    case "EQUIPO" : content = < Equipo isRemote = {isRemote} />; break;
    case "SOFTWARE" :  content = < Software isRemote = {isRemote} />; break;
    case "ESPECIALIDADES" :  content = < Especialidades isRemote = {isRemote} />; break;
    default: content = < Equipo isRemote = {isRemote} />; break;
  }

  return content;
}

function Equipo({isRemote}){
  const [InfoContext, setInfoCardContext] = useState(<></>);
  const [ListContext, setStoreListContext] = useState(<></>);
  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const colorPrincipal= {"backgroundColor": "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+", 1)"};
  return (
    <>
      {character.slots[0].items.map((element) => {
        return (
              <GeneratePersonalItems key={element} element={element} node={"equipment"} colorPrincipal={colorPrincipal} extraClass={""} typeId={0} />
        )
      })}
    </>
  );
}

function Software({isRemote}){
  const [InfoContext, setInfoCardContext] = useState(<></>);
  const [ListContext, setStoreListContext] = useState(<></>);
  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const colorPrincipal= {"backgroundColor": "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+", 1)"};
  return (
    <>
      {character.slots[1].items.map((element) => {
        return (
              <GeneratePersonalItems key={element} element={element} node={"software"} colorPrincipal={colorPrincipal} extraClass={""} typeId={1} />
        )
      })}
    </>
  );
}

function Especialidades({isRemote}){
  const [InfoContext, setInfoCardContext] = useState(<></>);
  const [ListContext, setStoreListContext] = useState(<></>);
  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const colorPrincipal= {"backgroundColor": "rgba("+character.colorPrime.R+","+character.colorPrime.G+","+character.colorPrime.B+", 1)"};
  return (
    <>
      {character.slots[2].items.map((element) => {
        return (
              <GeneratePersonalItems key={element} element={element} node={"specialty"} colorPrincipal={colorPrincipal} extraClass={"Specialty"} isRemote={isRemote} typeId={2} />
        )
      })}
    </>
  );
}

function GeneratePersonalItems({element, colorPrincipal, extraClass, isRemote, typeId}){

  const [infoCard, setinfoCard] = useContext(InfoCardContext);
  const [listStore, setlistStore] = useContext(StoreListContext);
  const [store, setStore] = useContext(StoreContext);
  const [character, setCharacter] = useContext(isRemote ? RemoteContext : CharacterContext);
  const item = store.items[element.asociatedId];
  
  const infoHandler = () => {
    element.asociatedId != -1 ? setinfoCard(<ItenInfo nodeInfo={{"type":character.name, "subType": typeId, "id": element.asociatedId, "slotId":-1, "isRemote":isRemote }} actionPermit={{"editActive":false, "unequipActive":false, "buyActivve":false}} />):setinfoCard(<></>);
  }
  const listHandler = () => {
    setlistStore(<StoreList nodeInfo={{"typeList":[character.name, 20], "subType": typeId, "slotId":element.slotId, "isRemote":isRemote}} actionPermit={{"editActive":true, "unequipActive":true, "buyActivve":false}} colorPrincipal={colorPrincipal} />);
    element.asociatedId != -1 ? setinfoCard(<ItenInfo nodeInfo={{"type":character.name, "subType": typeId, "id": element.asociatedId, "slotId":element.slotId, "isRemote":isRemote}} actionPermit={{"editActive":true, "unequipActive":true, "buyActivve":false}} />):setinfoCard(<></>);
  }

  return (
      <div className="contenedorInfoElement">
        <CreateIcon iconData={element.slot} isActiveRange={true}/>
        <div onClick={listHandler}>
          <InfoElementName element={element} item={item} />
          <InfoElementRangeDice element={element} item={item} extraClass={extraClass} />
        </div>
        <div className="circleInfo" onClick={infoHandler}>
          <i>
          i
          </i>
        </div>
      </div>
  )
}

function InfoElementName({element, item}){
  return <div className="infoElement1" title={element.name}>
          <div>{(item !== undefined && item.firstHex.length !==0) ?item.name:""}</div>
        </div> 
}

function InfoElementRangeDice({element, item, extraClass}){
  const correctSlot = item.slots.length !== 0 ? activeSlot(item.slots[0].TypeId, element.typeSlot) : false;
  return  <div className={"infoElement2 "+extraClass}>
            <InfoHex correctSlot={correctSlot} hex={item.firstHex}/>
            <InfoHex correctSlot={correctSlot} hex={item.secondHex}/>
          </div>
}

function InfoHex({correctSlot, hex}){
  return hex.map(
    (iconInfo) => {
      const itenValido = correctSlot && iconInfo.code !== '-' && !iconInfo.class.includes("void");
        return itenValido && <CreateIcon key={iconInfo} iconData={iconInfo} isActiveRange={true}/>
    }
  )
}

function StatsHexagon({stat, colorPrincipal, colorSecondary}){
  let contentComponent = <></>;
  const componentX = window.innerWidth * stat.positionX;
  const componentY = window.innerWidth * stat.positionY;
  const contentWidth = window.innerWidth*0.016;
  const image = new Image();
  image.src = svgDispenser(stat.marker);

  if (typeof (stat.max) === "object") {

    contentComponent = <StatImage stat={stat} positions={{"componentX":componentX, "contentWidth":contentWidth, "componentY":componentY}} />
   
  }
  else{
  contentComponent = <StatText stat={stat} positions={{"componentX":componentX, "contentWidth":contentWidth, "componentY":componentY}} />;
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
      fillLinearGradientEndPoint= { {x: -50, y: 15} }
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

function StatImage({stat, positions}){
  let imagePositionX = stat.max.length > 1 ? (positions.componentX + positions.contentWidth*0.8) : 0;
  const contentComponent =  stat.max.map( (maxData) => {
    const imageData = new Image();
    imagePositionX = stat.max.length > 1 ? imagePositionX-((positions.contentWidth*0.8)) : positions.componentX - positions.contentWidth*0.33;
    imageData.src = svgDispenser(maxData.code);
    return (
      <ImageKonva key={positions.componentY}
        image={imageData}
        x= {(imagePositionX)}
        y= {(positions.componentY + (window.innerWidth*0.00396))}
        height= {positions.contentWidth*0.75}
        width= {positions.contentWidth*0.75}
      />);
  })

  return contentComponent;
}

function StatText({stat, positions}){
    return <Text 
    text={stat.max}
    x= {stat.max.toString().length === 1 ? positions.componentX - (positions.contentWidth)/3.7 : positions.componentX - (positions.contentWidth)/1.7 }
    y= {(positions.componentY + (window.innerWidth*0.00396))}
    fontSize={positions.contentWidth}
    fill={'#fff'}
  />;
}

function activeSlot(TypeId, typeSlot){
  let validate = true;

  if(TypeId == undefined && typeSlot == undefined)
    return validate;

  if(TypeId == 2 && typeSlot == 1){
    validate = false;
  }
  else if(TypeId == 5 && typeSlot == 3){
    validate = false;
  }

  return validate;
}

export default ProfailMain;