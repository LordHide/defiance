
export function useActiveSlot(TypeId, typeSlot){
  let validate = true;

  if(TypeId == undefined && typeSlot == undefined)
    return validate;

  if(TypeId == 2 && typeSlot == 1){
    validate = false;
  }
  else if(TypeId == 5 && typeSlot == 3){
    validate = false;
  }

  return validate;
}