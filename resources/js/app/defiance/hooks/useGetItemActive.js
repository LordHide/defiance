
export function useGetItemActive(character, nodeInfo){
  const activeIten = character.slots[nodeInfo.subType].items.find(
    element => element.slotId === nodeInfo.slotId
    );

  return activeIten;
}