import { Inventario } from '../components/Inventario.js';
import { ProfailMain } from '../components/ProfailMain.js';
export function useLoadActiveContent(displayContent, character, first){
  let content;

  switch(displayContent){
    case "EQUIPO" : content = < ProfailMain key={1} isRemote={false} first={first} />; break;
    case "INVENTARIO" :  content = < Inventario first={first} />; break;
    case "REMOTO" :  content = < ProfailMain key={2} isRemote={true} remote={character.Remote} first={first} />; break;
    default: content = < Inventario />; break;
  }

  return content;
}