
export function useCorrectSlot(activeSlot, typeSlot){
  let validate = false;

  activeSlot.map(slotInfo => {
    if(typeSlot === 1 && (slotInfo.TypeId === 1 || slotInfo.TypeId === 2)){
      validate = true;
    }
    else if(typeSlot === 3 && (slotInfo.TypeId === 3 || slotInfo.TypeId === 5)){
      validate = true;
    }
    else if(typeSlot === 4 && (slotInfo.TypeId === 4 || slotInfo.TypeId === 5)){
      validate = true;
    }
    else if(typeSlot === slotInfo.TypeId || validate){
      validate = true;
    }
  });
    

  return validate;
}