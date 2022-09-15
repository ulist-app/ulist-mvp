import React, {useEffect, useState} from 'react';
import './App.scss';
import {ItemRepositoryLocalStorage} from "../../repositories/item.repository.local-storage";
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

export enum Views {
  All,
  Required,
  Mandatory
}

function App() {
  const [view, setView] = useState(Views.All)
  const [items, setItems] = useState(new ItemList([]))
  const [filteredItems, setFilteredItems] = useState(new ItemList([]))
  const [itemsNeedToBeUpdated, setItemsNeedToBeUpdated] = useState(false)
  const setViewAndFetch = (view: Views) => {
    setView(view)
    setItemsNeedToBeUpdated(true)
  }
  const useCases = generateUseCases(setItemsNeedToBeUpdated)
  const onSearch = (search: string) => {
    if (search) {
      const filteredItems = items.getAll()
        .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
      setFilteredItems(new ItemList(filteredItems))
    } else {
      setFilteredItems(items)
    }
  }

  useEffect(() => {
    useCases.getAllItems().then(setItems)
  }, [])

  useEffect(() => setFilteredItems(items), [items])

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
        <Menu activeView={view} setView={setViewAndFetch}  onSearch={onSearch}/>
      </main>
    </div>
  );
}

function generateUseCases(setItemsNeedToBeUpdated: (needUpdate: boolean) => void) {
  const itemRepository = new ItemRepositoryLocalStorage()
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
