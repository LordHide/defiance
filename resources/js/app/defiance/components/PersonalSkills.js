import React from 'react';
import '../css/ProfileGlobal.css';
import {CreateIcon} from './CreateIcon.js';

export function PersonalSkills({skill}){
  let contUniq = 0;
  return <div className="personalSkill">
          <div className="titleSkill">{skill.title}</div>
          <div className="textSkill">
            {skill.Content.map((content) => {
              return <CreateIcon key={contUniq++} iconData={content} isActiveRange={true}/>
            })}
          </div>
        </div>
}