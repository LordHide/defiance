
export function useCreaterCharacterSlot(item, nodeInfo, typeAssignment){
  let newSlot = {"slotId": item.slotId, "typeSlot":item.typeSlot, "asociatedId": -1, "name": "", "info": [], "slot": item.slot};

  if(typeAssignment == "assign"){
    newSlot.asociatedId = nodeInfo.id;
    newSlot.name = item.name;
  }

  return newSlot;
}