
export function useInfoIntervaloCorrecto(tipo, index, value){
  switch (tipo) {
    case "animationDelay":
      if(index === 2){
        value = 1.6;
      }
      else if(index === 4){
        value = 2.3;
      }
      else if((index+1) % 2 !== 0){
        value = value+0.2
      }
      break;
  
    default:
      if(index === 2){
        value = 1;
      }
      else if(index === 3){
        value = 16;
      }
      else if(index === 4){
        value = 46;
      }
      else if((index+1) % 2 !== 0){
        value = value+15
      }
      break;
  }

  return value;
}