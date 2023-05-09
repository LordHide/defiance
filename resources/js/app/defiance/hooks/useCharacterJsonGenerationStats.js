import { useIconCombersion } from './useIconCombersion.js';

export function useCharacterJsonGenerationStats(characterInfo, type){
    return [
      {
        name: "health",
        max: type == "baseCharacters" ? characterInfo.health : 0,
        current: type == "baseCharacters" ? characterInfo.health : 0,
        modifier: type == "baseCharacters" ? 0 : 0,
        marker: "_health",
        positionX: 0.590,
        positionY: 0.034,
      },
      {
        name: "aggro",
        max: type == "baseCharacters" ? characterInfo.agro : 0,
        current: type == "baseCharacters" ? 0: 0,
        modifier: type == "baseCharacters" ? 0 : 0,
        marker: "_agro",
        positionX: 0.590,
        positionY: 0.0737,
      },
      {
        name: "movement",
        max: type == "baseCharacters" ? characterInfo.Movement : 0,
        current: type == "baseCharacters" ? 0: 0,
        modifier: type == "baseCharacters" ? 0 : 0,
        marker: "_movement",
        positionX: 0.547,
        positionY: 0.0737,
      },
      {
        name: "defense",
        max: type == "baseCharacters" ? useIconCombersion(characterInfo.base_def) : 0,
        current: type == "baseCharacters" ? 0: 0,
        modifier: type == "baseCharacters" ? 0 : 0,
        marker: "_defense",
        positionX: 0.547,
        positionY: 0.114,
      }
    ];
  }