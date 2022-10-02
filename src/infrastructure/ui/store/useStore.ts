import { Id, ItemList } from "../../../domain";
import { proxy, useSnapshot } from "valtio";
import { UseCases } from "../../../application";

export interface Store {
  items: ItemList;
  useCases: {
    getAllItems(): void;
    setItemAsRequired(id: Id): void;
    setItemAsNotRequired(id: Id): void;
    setItemAsMandatory(id: Id): void;
    setItemAsNotMandatory(id: Id): void;
  };
}

const store = proxy<Store>({
  items: new ItemList([]),
  useCases: {
    getAllItems() {},
    setItemAsRequired() {},
    setItemAsNotRequired() {},
    setItemAsMandatory() {},
    setItemAsNotMandatory() {},
  },
});

export function initStore(useCases: UseCases) {
  store.items = new ItemList([]);
  store.useCases = {
    getAllItems() {
      useCases.getAllItems.exec().then((items) => {
        store.items = items;
      });
    },
    setItemAsRequired(id: Id) {
      useCases.setItemAsRequired.exec(id).then(() => {
        return store.useCases.getAllItems();
      });
    },
    setItemAsNotRequired(id: Id) {
      useCases.setItemAsNotRequired.exec(id).then(() => {
        return store.useCases.getAllItems();
      });
    },
    setItemAsMandatory(id: Id) {
      useCases.setItemAsMandatory.exec(id).then(() => {
        return store.useCases.getAllItems();
      });
    },
    setItemAsNotMandatory(id: Id) {
      useCases.setItemAsNotMandatory.exec(id).then(() => {
        return store.useCases.getAllItems();
      });
    },
  };
}

export function useStore() {
  return useSnapshot(store);
}
