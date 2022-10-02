import { Id, ItemList, Settings } from "../../../domain";
import { proxy, useSnapshot } from "valtio";
import { generateUseCases, UseCases } from "../../../application";
import { ItemRepositoryPouchDB } from "../../repositories/item-repository/item.repository.pouch-db";
import { LocalStorage, LocalStorageCollection } from "../../data-sources";
import { PouchDatasource } from "../../data-sources/pouch-db.data-source";
import { SettingsRepositoryLocalStorage } from "../../repositories";

export interface Store {
  items: ItemList;
  settings: Settings;
  actions: {
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
  actions: {
    getAllItems() {},
    getSettings() {},
    setItemAsRequired() {},
    setItemAsNotRequired() {},
    setItemAsMandatory() {},
    setItemAsNotMandatory() {},
    setSettings() {},
  },
});

function generateUseCasesWithRemoteDb(settings: Settings, cb: Function) {
  return generateUseCases({
    itemRepository: new ItemRepositoryPouchDB(
      PouchDatasource.createPouchDbBrowser({
        dbName: PouchDatasource.dbName,
        dbUrl: settings.syncUrl,
        cb,
      })
    ),
    settingsRepository: new SettingsRepositoryLocalStorage(
      new LocalStorage<Settings>(LocalStorageCollection.Settings)
    ),
  });
}
function generateUseCasesWithLocalDb() {
  const itemRepository = new ItemRepositoryPouchDB(
    PouchDatasource.createPouchDbBrowser({
      dbName: PouchDatasource.dbName,
    })
  );
  const settingsRepository = new SettingsRepositoryLocalStorage(
    new LocalStorage<Settings>(LocalStorageCollection.Settings)
  );
  return generateUseCases({
    itemRepository,
    settingsRepository,
  });
}

function generateActions(useCases: UseCases) {
  return {
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
        return store.actions.getAllItems();
      });
    },
    setItemAsNotRequired(id: Id) {
      useCases.setItemAsNotRequired.exec(id).then(() => {
        return store.actions.getAllItems();
      });
    },
    setItemAsMandatory(id: Id) {
      useCases.setItemAsMandatory.exec(id).then(() => {
        return store.actions.getAllItems();
      });
    },
    setItemAsNotMandatory(id: Id) {
      useCases.setItemAsNotMandatory.exec(id).then(() => {
        return store.actions.getAllItems();
      });
    },
    setSettings(settings: Settings) {
      useCases.setSettings.exec(settings).then((savedSettings) => {
        store.settings = savedSettings;
        initStore();
      });
    },
  };
}

export function initStore(useCases = generateUseCasesWithLocalDb()) {
  store.items = new ItemList([]);
  useCases.getSettings.exec().then((settings) => {
    if (settings.syncUrl) {
      console.log("[INIT STORE]: REMOTE DB");
      store.actions = generateActions(
        generateUseCasesWithRemoteDb(settings, store.actions.getAllItems)
      );
    } else {
      console.log("[INIT STORE]: LOCAL DB");
      store.actions = generateActions(useCases);
    }
  });
}

export function useStore() {
  return useSnapshot(store);
}
