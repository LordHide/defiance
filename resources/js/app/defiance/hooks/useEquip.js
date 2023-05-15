import React, {useContext} from 'react';
import {useGetItemPositionBySlotId} from './useGetItemPositionBySlotId'
import {useGetItemPositionByAsociatedId} from './useGetItemPositionByAsociatedId'
import {useGetItemPositionByTypeSlot} from './useGetItemPositionByTypeSlot'
import {useGetStorePosition} from './useGetStorePosition'
import {useCreaterCharacterSlot} from './useCreaterCharacterSlot'
import {useCorrectSlot} from './useCorrectSlot'
import StoreContext from '../context/StoreContext.js';
import StoreListContext from '../context/StoreListContext.js';
import InfoCardContext from '../context/InfoCardContext.js';
import RemoteContext from '../context/RemoteContext.js';
import CharacterContext from '../context/CharacterContext.js';

export function useEquip(valid){
  const [character, setCharacter] = useContext(valid.isRemote ? RemoteContext : CharacterContext);
  const [store, setStore] = useContext(StoreContext);
  const [listStore, setlistStore] = useContext(StoreListContext);
  const [infoCard, setinfoCard] = useContext(InfoCardContext);
  return (nodeInfo) => {
    const itemPosition = useGetItemPositionBySlotId(character, nodeInfo);
    const itemPositionEliminado = useGetItemPositionByAsociatedId(character, nodeInfo);
    const itemAssign = character.slots[nodeInfo.subType].items[itemPosition];
    const itemUnassign = character.slots[nodeInfo.subType].items[itemPositionEliminado];
    const storePosition = useGetStorePosition(store, nodeInfo, {"name":character.name, "asociatedId":itemAssign.asociatedId});

    if(itemAssign.asociatedId !== -1){
      if(itemUnassign === undefined){
        character.slots[nodeInfo.subType].items[itemPositionEliminado] = useCreaterCharacterSlot(itemAssign, {"id": itemAssign.asociatedId}, "unAssign");
        storePosition !== -1 ? store.type[character.name].asociatedItems[nodeInfo.subType].splice(storePosition, 1) : <></>;
      }
      else if(useCorrectSlot(store.items[itemAssign.asociatedId].slots, itemUnassign !== undefined ? itemUnassign.typeSlot:-1)){
        character.slots[nodeInfo.subType].items[itemPositionEliminado] = useCreaterCharacterSlot(itemUnassign, {"id": itemAssign.asociatedId}, "assign");
      }
      else{
        character.slots[nodeInfo.subType].items[itemPositionEliminado] = useCreaterCharacterSlot(itemUnassign, {"id": itemAssign.asociatedId}, "unAssign");
        storePosition !== -1 ? store.type[character.name].asociatedItems[nodeInfo.subType].splice(storePosition, 1) : <></>;
      }
      if(store.items[itemAssign.asociatedId].slots[0].TypeId == 5){
        const siblingItemPositionHead = useGetItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 3}, -1);
        const siblingItemPositionChest = useGetItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "slotypeSlottId": 4}, -1);
        character.slots[nodeInfo.subType].items[siblingItemPositionHead] = useCreaterCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHead], {"id": itemAssign.asociatedId}, "unAssign");
        character.slots[nodeInfo.subType].items[siblingItemPositionChest] = useCreaterCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionChest], {"id": itemAssign.asociatedId}, "unAssign");
      }
      else if(store.items[itemAssign.asociatedId].slots[0].TypeId == 2){
        const siblingItemPositionHand1 = useGetItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 1}, -1);
        const siblingItemPositionHand2 = useGetItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 1}, siblingItemPositionHand1 );
        character.slots[nodeInfo.subType].items[siblingItemPositionHand1] = useCreaterCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHand1], {"id": itemAssign.asociatedId}, "unAssign");
        character.slots[nodeInfo.subType].items[siblingItemPositionHand2] = useCreaterCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHand2], {"id": itemAssign.asociatedId}, "unAssign");
      }
    }
    else if(itemPositionEliminado !== undefined){
      character.slots[nodeInfo.subType].items[itemPositionEliminado] = useCreaterCharacterSlot(itemUnassign, {"id": itemAssign.asociatedId}, "unAssign");
      storePosition !== -1 ? store.type[character.name].asociatedItems[nodeInfo.subType].splice(storePosition, 1) : <></>;
    }

    if(store.items[nodeInfo.id].slots[0].TypeId == 5){
      const siblingItemPositionHead = useGetItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 3}, -1);
      const siblingItemPositionChest = useGetItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 4}, -1);
      character.slots[nodeInfo.subType].items[siblingItemPositionHead] = useCreaterCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHead], nodeInfo, "assign");
      character.slots[nodeInfo.subType].items[siblingItemPositionChest] = useCreaterCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionChest], nodeInfo, "assign");
    }
    else if(store.items[nodeInfo.id].slots[0].TypeId == 2){
      const siblingItemPositionHand1 = useGetItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 1}, -1);
      const siblingItemPositionHand2 = useGetItemPositionByTypeSlot(character, {"subType":nodeInfo.subType, "typeSlot": 1}, siblingItemPositionHand1 );
      character.slots[nodeInfo.subType].items[siblingItemPositionHand1] = useCreaterCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHand1], nodeInfo, "assign");
      character.slots[nodeInfo.subType].items[siblingItemPositionHand2] = useCreaterCharacterSlot(character.slots[nodeInfo.subType].items[siblingItemPositionHand2], nodeInfo, "assign");
    }
    else{
      character.slots[nodeInfo.subType].items[itemPosition] = useCreaterCharacterSlot(itemAssign, nodeInfo, "assign");
    }

    //itemUnassign !== undefined ? character.slots[nodeInfo.subType].items[itemPositionEliminado] = useCreaterCharacterSlot(itemUnassign, {"id": itemAssign.asociatedId}, "assign") : <></>;
    useGetStorePosition(store, nodeInfo, {"name":character.name, "asociatedId":nodeInfo.id}) === -1 ? store.type[character.name].asociatedItems[nodeInfo.subType].push(nodeInfo.id) : <></>;
    setCharacter({...character});
    setStore({...store});
    setlistStore(<></>);
    setinfoCard(<></>);
  };
}