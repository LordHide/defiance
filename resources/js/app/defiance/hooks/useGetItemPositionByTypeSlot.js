
export function useGetItemPositionByTypeSlot(character, nodeInfo, notIndex){

  let itemPosition;

  character.slots[nodeInfo.subType].items.map((item, index) => {
    if(item.typeSlot === nodeInfo.typeSlot && index !== notIndex){
      return itemPosition = index;
    }
  });

  return itemPosition;
}