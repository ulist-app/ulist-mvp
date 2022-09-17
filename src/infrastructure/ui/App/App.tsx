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
import {ItemList, palette} from "../../../core";
import {List} from "../components/List";
import {Menu} from "../components/Menu";
import {LocalStorageCollection, LocalStorage} from "../../data-sources/LocalStorage/LocalStorage";

export enum Views {
  All,
  Required,
  Mandatory
}

function App() {
  const [lastSearch, setLastSearch] = useState('')
  const [view, setView] = useState(Views.All)
  const [items, setItems] = useState(new ItemList([]))
  const [itemsNeedToBeUpdated, setItemsNeedToBeUpdated] = useState(false)
  const useCases = generateUseCases(setItemsNeedToBeUpdated)

  function onSearch(search: string) {
    setLastSearch(search)
  }

  useEffect(() => {
    useCases.getAllItems().then(setItems)
  }, [])

  useEffect(() => {
    useCases.getAllItems().then(setItems)
  }, [view])

  useEffect(() => {
    if (itemsNeedToBeUpdated) {
      useCases.getAllItems().then(setItems)
      setItemsNeedToBeUpdated(false)
    }
  }, [itemsNeedToBeUpdated])

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          backgroundColor: palette.purple,
          color: palette.white,
        }}
      >
        <h1>
          🛒 Groceries list 🛒
        </h1>
      </header>
      <main className="App-main">
        {view === Views.All && <List items={items.search(lastSearch).getAll()} {...useCases}/>}
        {view === Views.Required && <List items={items.search(lastSearch).getAllRequired()} {...useCases}/>}
        {view === Views.Mandatory && <List items={items.search(lastSearch).getAllMandatory()} {...useCases}/>}
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
