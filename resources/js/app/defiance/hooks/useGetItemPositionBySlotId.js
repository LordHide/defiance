
export function useGetItemPositionBySlotId(character, nodeInfo){

  let itemPosition;

  character.slots[nodeInfo.subType].items.map((item, index) => {
    if(item.slotId === nodeInfo.slotId){
      return itemPosition = index;
    }
  });

  return itemPosition;
}