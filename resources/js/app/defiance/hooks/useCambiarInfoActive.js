import { Equipo } from '../components/Equipo.js';
import { Software } from '../components/Software.js';
import { Especialidades } from '../components/Especialidades.js';
export function useCambiarInfoActive(name, isRemote){
  let content;

  switch(name){
    case "EQUIPO" : content = < Equipo isRemote = {isRemote} />; break;
    case "SOFTWARE" :  content = < Software isRemote = {isRemote} />; break;
    case "ESPECIALIDADES" :  content = < Especialidades isRemote = {isRemote} />; break;
    default: content = < Equipo isRemote = {isRemote} />; break;
  }

  return content;
}