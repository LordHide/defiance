import React, {useContext} from 'react';
import {useGetItemPositionBySlotId} from './useGetItemPositionBySlotId'
import {useGetItemPositionByTypeSlot} from './useGetItemPositionByTypeSlot'
import {useGetStorePosition} from './useGetStorePosition'
import {useCreaterCharacterSlot} from './useCreaterCharacterSlot'
import StoreContext from '../context/StoreContext.js';
import StoreListContext from '../context/StoreListContext.js';
import InfoCardContext from '../context/InfoCardContext.js';
import RemoteContext from '../context/RemoteContext.js';
import CharacterContext from '../context/CharacterContext.js';

export function useUnEquip(valid){
  const [character, setCharacter] = useContext(valid.isRemote ? RemoteContext : CharacterContext);
  const [store, setStore] = useContext(StoreContext);
  const [listStore, setlistStore] = useContext(StoreListContext);
  const [infoCard, setinfoCard] = useContext(InfoCardContext);
  return (nodeInfo) => {
    const itemPosition = useGetItemPositionBySlotId(character, nodeInfo);
    const item = character.slots[nodeInfo.subType].items[itemPosition];
    const storePosition = useGetStorePosition(store, nodeInfo, {"name":character.name, "asociatedId":item.asociatedId});

    if(store.items[item.asociatedId].slots[0].TypeId == 5){
      const siblingItemPositionHead = useGetItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 3}, -1);
      const siblingItemPositionChest = useGetItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 4}, -1);
      character.slots[nodeInfo.subType].items[siblingItemPositionHead] = useCreaterCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHead], nodeInfo, "unAssign");
      character.slots[nodeInfo.subType].items[siblingItemPositionChest] = useCreaterCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionChest], nodeInfo, "unAssign");
    }
    else if(store.items[item.asociatedId].slots[0].TypeId == 2){
      const siblingItemPositionHand1 = useGetItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 1}, -1);
      const siblingItemPositionHand2 = useGetItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 1}, siblingItemPositionHand1 );
      character.slots[nodeInfo.subType].items[siblingItemPositionHand1] = useCreaterCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHand1], nodeInfo, "unAssign");
      character.slots[nodeInfo.subType].items[siblingItemPositionHand2] = useCreaterCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHand2], nodeInfo, "unAssign");
    }
    else{
      character.slots[nodeInfo.subType].items[itemPosition] = useCreaterCharacterSlot(item, nodeInfo, "unAssign");
    }
    store.type[character.name].asociatedItems[nodeInfo.subType].splice(storePosition, 1);
    setCharacter({...character});
    setStore({...store});
    setlistStore(<></>);
    setinfoCard(<></>);
  };
}