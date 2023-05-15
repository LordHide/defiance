
export function useNewIdHandler(idModifier, store, nodeInfo) {
  const asociatedIndex = nodeInfo.subType !== null ? 
    store.type[nodeInfo.type].asociatedItems[nodeInfo.subType] : store.type[nodeInfo.type].asociatedItems;
  const currentIndex = asociatedIndex.indexOf(nodeInfo.id);

  let indexValue = currentIndex + idModifier;
  let newId = 0;

  if(indexValue == asociatedIndex.length){
    indexValue = 0;
  }
  if(indexValue == -1){
    indexValue = asociatedIndex.length - 1;
  }

  newId = asociatedIndex[indexValue];

  return newId
}