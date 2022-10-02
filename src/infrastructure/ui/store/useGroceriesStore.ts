import { Id, ItemList } from "../../../domain";
import { proxy, useSnapshot } from "valtio";
import { UseCases } from "../../../application";

export interface GroceriesStore {
  items: ItemList;
  useCases: {
    getAllItems(): Promise<void>;

    setItemAsRequired(id: Id): Promise<void>;

    setItemAsNotRequired(id: Id): Promise<void>;

    setItemAsMandatory(id: Id): Promise<void>;

    setItemAsNotMandatory(id: Id): Promise<void>;
  };
}

const store = proxy<GroceriesStore>({
  items: new ItemList([]),
  useCases: {
    async getAllItems() {},

    async setItemAsRequired() {},

    async setItemAsNotRequired() {},

    async setItemAsMandatory() {},

    async setItemAsNotMandatory() {},
  },
});

export function initStore(useCases: UseCases) {
  store.items = new ItemList([]);
  store.useCases = {
    async getAllItems() {
      store.items = await useCases.getAllItems.exec();
    },
    async setItemAsRequired(id: Id) {
      await useCases.setItemAsRequired.exec(id);
      await store.useCases.getAllItems();
    },
    async setItemAsNotRequired(id: Id) {
      await useCases.setItemAsNotRequired.exec(id);
      await store.useCases.getAllItems();
    },
    async setItemAsMandatory(id: Id) {
      await useCases.setItemAsMandatory.exec(id);
      await store.useCases.getAllItems();
    },
    async setItemAsNotMandatory(id: Id) {
      await useCases.setItemAsNotMandatory.exec(id);
      await store.useCases.getAllItems();
    },
  };
}

export function useGroceriesStore() {
  return useSnapshot(store);
}
