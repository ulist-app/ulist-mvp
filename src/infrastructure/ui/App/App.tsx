import React, {useEffect, useState} from 'react';
import './App.scss';
import {ItemRepositoryLocalStorage} from "../../repositories/item.repository.local-storage";
import {GetAllItemsCase, SetItemAsRequiredCase} from "../../../application";
import {SetItemAsMandatoryCase} from "../../../application/cases/set-item-as-mandatory/set-item-as-mandatory.case";
import {
  SetItemAsNotRequiredCase
} from "../../../application/cases/set-item-as-not-required/set-item-as-not-required.case";
import {
  SetItemAsNotMandatoryCase
} from "../../../application/cases/set-item-as-not-mandatory/set-item-as-not-mandatory.case";
import {ItemList} from "../../../core";
import {List} from "../components/List";

function App() {
  const useCases = generateUseCases()
  const [items, setItems] = useState(new ItemList([]))
  console.log(items.getAll().at(0)?.toString())

  useEffect(() => {
    useCases.getAllItems.exec().then(setItems)
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        uList
      </header>
      <main>
        <List items={items.getAll()}/>
      </main>
    </div>
  );
}

function generateUseCases() {
  const itemRepository = new ItemRepositoryLocalStorage()
  return {
    getAllItems: new GetAllItemsCase(itemRepository),
    setItemAsRequired: new SetItemAsRequiredCase(itemRepository),
    setItemAsNotRequired: new SetItemAsNotRequiredCase(itemRepository),
    setItemAsMandatory: new SetItemAsMandatoryCase(itemRepository),
    setItemAsNotMandatory: new SetItemAsNotMandatoryCase(itemRepository),
  }
}

export default App;
