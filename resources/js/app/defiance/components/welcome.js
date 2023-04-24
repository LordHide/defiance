import React, {useEffect, useContext} from 'react';
import { CreateIcon } from '../storeManagement.js';
import '../css/components/login.css';
import UserContext from '../context/UserContext.js';
import BaseCharactersContext from '../context/baseCharactersContext.js';
import UserCharactersContext from '../context/userCharactersContext.js';
import InfoIconContext from '../context/InfoIconContext.js';

export function Welcome({ firstLoad, onLoad }) {

  const [userData, setUserData] = useContext(UserContext);
  const [baseCharacters, setBaseCharacters] = useContext(BaseCharactersContext);
  const [userCharacters, setUserCharacters] = useContext(UserCharactersContext);
  const [infoIcon, setInfoIcon] = useContext(InfoIconContext);

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
          let baseCharacters = characterJsonGeneration(response.baseCharacters, infoIcon);
          setBaseCharacters(baseCharacters);
          setUserCharacters(response.userCharacters);
          onLoad();
        }
      )
      .catch((error) => {
          console.log(error);
        }
      );
    },[baseCharacters, userCharacters]
  )

  return <div className="loading">
    <div>
      {firstLoad && <p className='welcomeSing transAparition'>Welcome {userData.name}</p>}
      <CreateIcon iconData={{ "type": "png", "code": "logoDefianceImg", "class": "logoLoading transAparition" }} isActiveRange={false} />
      <div className="containerCircleLoading">
      </div>
    </div>
  </div>;
}

function characterJsonGeneration(characterInfo, infoIcon, type = "baseCharacters"){
  let characterJson = {};

  characterInfo.forEach(element => {
    let currentJson = {};
    currentJson = {
      id: element.id,
      name: element.name,
      type: element.typeEs,
      nameFull: element.name_full,
      stats: [
        {
          name: "health",
          max: type == "baseCharacters" ? element.health : 0,
          current: type == "baseCharacters" ? element.health : 0,
          modifier: type == "baseCharacters" ? 0 : 0,
          marker: infoIcon[9],
          positionX: 0.590,
          positionY: 0.034,
        },
        {
          name: "aggro",
          max: type == "baseCharacters" ? element.agro : 0,
          current: type == "baseCharacters" ? 0: 0,
          modifier: type == "baseCharacters" ? 0 : 0,
          marker: infoIcon[11],
          positionX: 0.590,
          positionY: 0.0737,
        },
        {
          name: "movement",
          max: type == "baseCharacters" ? element.Movement : 0,
          current: type == "baseCharacters" ? 0: 0,
          modifier: type == "baseCharacters" ? 0 : 0,
          marker: infoIcon[36],
          positionX: 0.547,
          positionY: 0.0737,
        },
        {
          name: "defense",
          max: type == "baseCharacters" ? iconCombersion(element.base_def) : 0,
          current: type == "baseCharacters" ? 0: 0,
          modifier: type == "baseCharacters" ? 0 : 0,
          marker: infoIcon[10],
          positionX: 0.547,
          positionY: 0.114,
        }
      ],
      colorPrime: {
        R: element.colorPrimeR,
        G: element.colorPrimeG,
        B: element.colorPrimeB
      },
      colorSecon: {
        R: element.colorSeconR,
        G: element.colorSeconG,
        B: element.colorSeconB
      },
      subMenu:[
        {name: "EQUIPO"},
        {name: "INVENTARIO"},
        {name: "DEFIANCE"}
      ],
      infoContainer:[
        {name: "EQUIPO"},
        {name: "ESPECIALIDADES"}
      ],
      personalSkill: [
          {title: "Atraeré su Fuego", Content:[
              { type: "text", code: "Una vez durante tu Activación, cuando inflinjas"},
              { type: "svg", code: "herida"},
              { type: "text", code: " a un Enemigo, puedes tomar una ficha de"},
              { type: "svg", code: "agro"},
              { type: "text", code: " de un Personaje y ponerla en tu carta de Personaje."}]
          },
          {title: "Atraeré su Fuego", Content:[
            { type: "text", code: "Una vez durante tu Activación, cuando inflinjas"},
            { type: "svg", code: "herida"},
            { type: "text", code: " a un Enemigo, puedes tomar una ficha de"},
            { type: "svg", code: "agro"},
            { type: "text", code: " de un Personaje y ponerla en tu carta de Personaje."}]
          }
      ],
      characterState:[
        {name: "aturdido", icon: {text:"stunned", x:0.09533, y:0.04095}, active: false, color1: "142, 76, 0", color2: "142, 76, 0", positionX: 0.10533, positionY: 0.05395, positionXBlur: -7, positionYBlur: 0, angle:0},
        {name: "ardiendo", icon: {text:"burning", x:0.13133, y:0.02095}, active: false, color1: "223, 121, 43", color2: "238, 43, 43", positionX: 0.14066, positionY: 0.03395, positionXBlur: 0, positionYBlur: 7, angle:180},
        {name: "marcado", icon: {text:"marked", x:0.16733, y:0.04095}, active: false, color1: "249, 21, 45", color2: "239, 15, 239", positionX: 0.17616, positionY: 0.05395, positionXBlur: 7, positionYBlur: 0, angle:0},
        {name: "concentrado", icon: {text:"concentrated", x:0.09533, y:0.09095}, active: false, color1: "210, 179, 26", color2: "233, 233, 42", positionX: 0.10533, positionY: 0.0944, positionXBlur: 7, positionYBlur: 0, angle:180},
        {name: "cegado", icon: {text:"blind", x:0.13133, y:0.10895}, active: false, color1: "33, 185, 48", color2: "96, 135, 17", positionX: 0.14066, positionY: 0.1143, positionXBlur: 0, positionYBlur: 7, angle:0},
        {name: "inmovilizado", icon: {text:"immobilized", x:0.16733, y:0.09095}, active: false, color1: "26, 47, 128", color2: "52, 186, 225", positionX: 0.17616, positionY: 0.0944, positionXBlur: -7, positionYBlur: 0, angle:180},
        {name: "oculto", icon: {text:"hidden", x:0.13133, y:0.05295}, active: false, color1: "249, 249, 249", color2: "249, 249, 249", positionX: 0.14066, positionY: 0.07395, angle:180},
        {name: "inconsciente", icon: {text:"unconscious", x:0.13133, y:0.07895}, active: false, color1: "12, 12, 12", color2: "12, 12, 12", positionX: 0.14066, positionY: 0.07395, angle:0}
      ],
      "slots":{
        "0":{"name":"equipment",
            "items":[
                {slotId: 1, typeSlot:1, asociatedId: 24, slot: { type: "svg", code: "mano"}},
                {slotId: 2, typeSlot:1, asociatedId: 24, slot: { type: "svg", code: "mano"}},
                {slotId: 3, typeSlot:3, asociatedId: 25, slot: { type: "svg", code: "casco"}},
                {slotId: 4, typeSlot:4, asociatedId: 25, slot: { type: "svg", code: "pecho"}},
                {slotId: 5, typeSlot:6, asociatedId: -1, slot: { type: "svg", code: "equipo"}},
                {slotId: 6, typeSlot:6, asociatedId: -1, slot: { type: "svg", code: "equipo"}},
                {slotId: 7, typeSlot:6, asociatedId: 2, slot: { type: "svg", code: "equipo"}}
            ]
        },
        1:{name:"software",
          items:[]
        },
        2:{name:"specialties",
            items:[]
        }
      }
    };
    characterJson[element.id] = currentJson;
  });

  return characterJson;
}

function iconCombersion(context){

  let sectionCode = [];
  context = context.split("/");

  for (const sections of context) {
    sectionCode.push({type: isNaN(sections) ? "text" : "svg", code: sections});
  }

  return sectionCode;
}