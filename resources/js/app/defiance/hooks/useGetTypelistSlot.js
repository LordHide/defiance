
export function useGetTypelistSlot(typeSlot, name){
  if(typeSlot === 1){
    return [name, 12, 13];
  }
  else if(typeSlot === 3){
    return [name, 19, 13, 20];
  }
  else if(typeSlot === 4){
    return [name, 20];
  }
  else if(typeSlot === 6){
    return [name, 21];
  }
  else if(typeSlot === 7){
    return [name, 2];
  }
}