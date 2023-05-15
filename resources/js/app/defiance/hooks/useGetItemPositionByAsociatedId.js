
export function useGetItemPositionByAsociatedId(character, nodeInfo){

  let itemPosition;

  character.slots[nodeInfo.subType].items.map((item, index) => {
    if(item.asociatedId === nodeInfo.id){
      itemPosition = index;
    }
  });

  return itemPosition;
}