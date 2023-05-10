import { useIconCombersion } from './useIconCombersion.js';

export function useCharacterJsonGenerationSkills(characterSkills){
  let skillsList = [];
  let title = "";
  let content = [];

  // characterSkills.each(skillsGroup => {
  //   skillsGroup.each(skills => {
      
  //   })
    
  // })

  for (let group in characterSkills) {
    let skillsGroup = characterSkills[group];
    title = "";
    content = [];
    for (let skills in skillsGroup) {
      skillsGroup[skills].Type == "personalSkill/title" ?
        title = skillsGroup[skills].text_es :
        content = useIconCombersion(skillsGroup[skills].text_es);
    }
    skillsList.push({title: title, Content:content});
  }

  return skillsList;
}