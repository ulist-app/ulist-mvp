import { Id, ItemList, Settings } from "../../../domain";
import { proxy, useSnapshot } from "valtio";
import { UseCases } from "../../../application";

export interface Store {
  items: ItemList;
  settings: Settings;
  useCases: {
    getAllItems(): void;
    getSettings(): void;
    setItemAsRequired(id: Id): void;
    setItemAsNotRequired(id: Id): void;
    setItemAsMandatory(id: Id): void;
    setItemAsNotMandatory(id: Id): void;
    setSettings(settings: Settings): void;
  };
}

const store = proxy<Store>({
  items: new ItemList([]),
  settings: { syncUrl: undefined },
  useCases: {
    getAllItems() {},
    getSettings() {},
    setItemAsRequired() {},
    setItemAsNotRequired() {},
    setItemAsMandatory() {},
    setItemAsNotMandatory() {},
    setSettings() {},
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
    getSettings() {
      useCases.getSettings.exec().then((settings) => {
        store.settings = settings;
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
    setSettings(settings: Settings) {
      useCases.setSettings.exec(settings).then((savedSettings) => {
        store.settings = savedSettings;
        // initStore(
        //   generateUseCases({
        //     itemRepository: new ItemRepositoryPouchDB(
        //       PouchDatasource.createPouchDbBrowser({
        //         dbName: PouchDatasource.dbName,
        //         dbUrl: savedSettings.syncUrl,
        //         cb: () => {
        //           store.useCases.getAllItems();
        //         },
        //       })
        //     ),
        //     settingsRepository: new SettingsRepositoryLocalStorage(
        //       new LocalStorage<Settings>(LocalStorageCollection.Settings)
        //     ),
        //   })
        // );
      });
    },
  };
}

export function useStore() {
  return useSnapshot(store);
}
