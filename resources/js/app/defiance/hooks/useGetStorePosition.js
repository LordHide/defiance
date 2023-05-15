
export function useGetStorePosition(store, nodeInfo, extraParm){
  return store.type[extraParm.name].asociatedItems[nodeInfo.subType].indexOf(extraParm.asociatedId);
}