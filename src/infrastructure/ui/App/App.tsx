import React, { useEffect, useMemo, useState } from "react";
import "./App.scss";
import {
  GetAllItemsCase,
  SetItemAsMandatoryCase,
  SetItemAsNotMandatoryCase,
  SetItemAsNotRequiredCase,
  SetItemAsRequiredCase,
  UseCase,
} from "../../../application";
import { ItemList, palette } from "../../../domain";
import { List, Menu, Views } from "../components";

interface AppUseCases {
  getAllItems: GetAllItemsCase;
  setItemAsRequired: SetItemAsRequiredCase;
  setItemAsNotRequired: SetItemAsNotRequiredCase;
  setItemAsMandatory: SetItemAsMandatoryCase;
  setItemAsNotMandatory: SetItemAsNotMandatoryCase;
}

export interface AppProps extends AppUseCases {}

function App(props: AppProps) {
  const [lastSearch, setLastSearch] = useState("");
  const [view, setView] = useState(Views.All);
  const [items, setItems] = useState(new ItemList([]));
  const [itemsNeedToBeUpdated, setItemsNeedToBeUpdated] = useState(false);
  const useCases = useMemo(
    () => triggerFetchAfterExecUseCase(props, setItemsNeedToBeUpdated),
    [props]
  );

  function onSearch(search: string) {
    setLastSearch(search);
  }

  useEffect(() => {
    useCases.getAllItems().then(setItems);
  }, [useCases, view]);

  useEffect(() => {
    if (itemsNeedToBeUpdated) {
      useCases.getAllItems().then(setItems);
      setItemsNeedToBeUpdated(false);
    }
  }, [useCases, itemsNeedToBeUpdated]);

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          backgroundColor: palette.purple,
          color: palette.white,
        }}
      >
        <h1>🛒 Groceries list 🛒</h1>
      </header>
      <main className="App-main">
        {view === Views.All && (
          <List items={items.search(lastSearch).getAll()} {...useCases} />
        )}
        {view === Views.Required && (
          <List
            items={items.search(lastSearch).getAllRequired()}
            {...useCases}
          />
        )}
        {view === Views.Mandatory && (
          <List
            items={items.search(lastSearch).getAllMandatory()}
            {...useCases}
          />
        )}
        <Menu activeView={view} setView={setView} onSearch={onSearch} />
      </main>
    </div>
  );
}

function triggerFetchAfterExecUseCase(
  useCases: AppUseCases,
  setItemsNeedToBeUpdated: (needUpdate: boolean) => void
) {
  const withFetch = (useCase: UseCase<any, Promise<any>>) => (args: any) =>
    useCase.exec
      .bind(useCase)(args)
      .then(() => setItemsNeedToBeUpdated(true));
  return {
    getAllItems: useCases.getAllItems.exec.bind(useCases.getAllItems),
    setItemAsRequired: withFetch(useCases.setItemAsRequired),
    setItemAsNotRequired: withFetch(useCases.setItemAsNotRequired),
    setItemAsMandatory: withFetch(useCases.setItemAsMandatory),
    setItemAsNotMandatory: withFetch(useCases.setItemAsNotMandatory),
  };
}

export default App;
