import React, {useEffect, useState} from 'react';
import './App.scss';
import {
  ItemRepositoryLocalStorage,
  LocalStorageItemRecord
} from "../../repositories/item-repository/item-repository.local-storage";
import {
  GetAllItemsCase,
  SetItemAsMandatoryCase,
  SetItemAsNotMandatoryCase,
  SetItemAsNotRequiredCase,
  SetItemAsRequiredCase,
  UseCase
} from "../../../application";
import {ItemList} from "../../../core";
import {List} from "../components/List";
import {Menu} from "../components/Menu";
import {LocalStorageCollection, LocalStorage} from "../../data-sources/LocalStorage/LocalStorage";

export enum Views {
  All,
  Required,
  Mandatory
}

function filterItems(items: ItemList, search: string) {
  const filteredItems = items.getAll()
    .filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  return new ItemList(filteredItems)
}

function App() {
  const [lastSearch, setLastSearch] = useState('')
  const [view, setView] = useState(Views.All)
  const [items, setItems] = useState(new ItemList([]))
  const [filteredItems, setFilteredItems] = useState(new ItemList([]))
  const [itemsNeedToBeUpdated, setItemsNeedToBeUpdated] = useState(false)
  const useCases = generateUseCases(setItemsNeedToBeUpdated)

  function updateFilteredItems(search: string) {
    if (search) {
      setFilteredItems(filterItems(items, search))
    } else {
      setFilteredItems(items)
    }
  }

  function onSearch(search: string) {
    setLastSearch(search)
    updateFilteredItems(search)
  }

  useEffect(() => {
    useCases.getAllItems().then(setItems)
  }, [])

  useEffect(() => {
    useCases.getAllItems().then(setItems)
  }, [view])

  useEffect(() => {
    updateFilteredItems(lastSearch);
  }, [items])

  useEffect(() => {
    if (itemsNeedToBeUpdated) {
      useCases.getAllItems().then(setItems)
      setItemsNeedToBeUpdated(false)
    }
  }, [itemsNeedToBeUpdated])

  return (
    <div className="App">
      <header className="App-header">
        🛒 Groceries list 🛒
      </header>
      <main className="App-main">
        {view === Views.All && <List items={filteredItems.getAll()} {...useCases}/>}
        {view === Views.Required && <List items={filteredItems.getAllRequired()} {...useCases}/>}
        {view === Views.Mandatory && <List items={filteredItems.getAllMandatory()} {...useCases}/>}
        <Menu activeView={view} setView={setView} onSearch={onSearch}/>
      </main>
    </div>
  );
}

function generateUseCases(setItemsNeedToBeUpdated: (needUpdate: boolean) => void) {
  const itemRepository = new ItemRepositoryLocalStorage(new LocalStorage<LocalStorageItemRecord>(LocalStorageCollection.Items))
  const withFetch = (useCase: UseCase<any, Promise<any>>) => (args: any) =>
    useCase.exec
      .bind(useCase)(args)
      .then(() => setItemsNeedToBeUpdated(true))
  const getAllItems = new GetAllItemsCase(itemRepository)
  return {
    getAllItems: getAllItems.exec.bind(getAllItems),
    setItemAsRequired: withFetch(new SetItemAsRequiredCase(itemRepository)),
    setItemAsNotRequired: withFetch(new SetItemAsNotRequiredCase(itemRepository)),
    setItemAsMandatory: withFetch(new SetItemAsMandatoryCase(itemRepository)),
    setItemAsNotMandatory: withFetch(new SetItemAsNotMandatoryCase(itemRepository)),
  }
}

export default App;
