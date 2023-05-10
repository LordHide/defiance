import {useCharacterJsonGenerationStats } from './useCharacterJsonGenerationStats.js';
import {useCharacterJsonGenerationSkills } from './useCharacterJsonGenerationSkills.js';

export function useCharacterJsonGeneration(characterInfoList, characterSkills, type = "baseCharacters"){
    let characterJson = {};
  
    characterInfoList.forEach(characterInfo => {
      let currentJson = {};
      currentJson = {
        id: characterInfo.id,
        name: characterInfo.name,
        type: characterInfo.typeEs,
        nameFull: characterInfo.name_full,
        stats: useCharacterJsonGenerationStats(characterInfo, type),
        colorPrime: {
          R: characterInfo.colorPrimeR,
          G: characterInfo.colorPrimeG,
          B: characterInfo.colorPrimeB
        },
        colorSecon: {
          R: characterInfo.colorSeconR,
          G: characterInfo.colorSeconG,
          B: characterInfo.colorSeconB
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
        personalSkill: useCharacterJsonGenerationSkills(characterSkills[characterInfo.id]),
        characterState:[
          {name: "aturdido", icon: {text:"_stunned", x:0.09533, y:0.04095}, active: false, color1: "142, 76, 0", color2: "142, 76, 0", positionX: 0.10533, positionY: 0.05395, positionXBlur: -7, positionYBlur: 0, angle:0},
          {name: "ardiendo", icon: {text:"_burning", x:0.13133, y:0.02095}, active: false, color1: "223, 121, 43", color2: "238, 43, 43", positionX: 0.14066, positionY: 0.03395, positionXBlur: 0, positionYBlur: 7, angle:180},
          {name: "marcado", icon: {text:"_marked", x:0.16733, y:0.04095}, active: false, color1: "249, 21, 45", color2: "239, 15, 239", positionX: 0.17616, positionY: 0.05395, positionXBlur: 7, positionYBlur: 0, angle:0},
          {name: "concentrado", icon: {text:"_concentrated", x:0.09533, y:0.09095}, active: false, color1: "210, 179, 26", color2: "233, 233, 42", positionX: 0.10533, positionY: 0.0944, positionXBlur: 7, positionYBlur: 0, angle:180},
          {name: "cegado", icon: {text:"_blind", x:0.13133, y:0.10895}, active: false, color1: "33, 185, 48", color2: "96, 135, 17", positionX: 0.14066, positionY: 0.1143, positionXBlur: 0, positionYBlur: 7, angle:0},
          {name: "inmovilizado", icon: {text:"_immobilized", x:0.16733, y:0.09095}, active: false, color1: "26, 47, 128", color2: "52, 186, 225", positionX: 0.17616, positionY: 0.0944, positionXBlur: -7, positionYBlur: 0, angle:180},
          {name: "oculto", icon: {text:"_hidden", x:0.13133, y:0.05295}, active: false, color1: "249, 249, 249", color2: "249, 249, 249", positionX: 0.14066, positionY: 0.07395, angle:180},
          {name: "inconsciente", icon: {text:"_unconscious", x:0.13133, y:0.07895}, active: false, color1: "12, 12, 12", color2: "12, 12, 12", positionX: 0.14066, positionY: 0.07395, angle:0}
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
      characterJson[characterInfo.id] = currentJson;
    });
  
    return characterJson;
  }