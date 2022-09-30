import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './infrastructure/ui/App/App';
import reportWebVitals from './reportWebVitals';
import {
  ItemRepositoryLocalStorage,
  LocalStorageItemRecord
} from "./infrastructure/repositories/item-repository/item-repository.local-storage";
import {LocalStorage, LocalStorageCollection} from "./infrastructure/data-sources/LocalStorage/LocalStorage";
import {
  GetAllItemsCase,
  SetItemAsMandatoryCase, SetItemAsNotMandatoryCase,
  SetItemAsNotRequiredCase,
  SetItemAsRequiredCase,
} from "./application";

const itemRepository = new ItemRepositoryLocalStorage(new LocalStorage<LocalStorageItemRecord>(LocalStorageCollection.Items))
const useCases = {
  getAllItems: new GetAllItemsCase(itemRepository),
  setItemAsRequired: new SetItemAsRequiredCase(itemRepository),
  setItemAsNotRequired: new SetItemAsNotRequiredCase(itemRepository),
  setItemAsMandatory: new SetItemAsMandatoryCase(itemRepository),
  setItemAsNotMandatory: new SetItemAsNotMandatoryCase(itemRepository),
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App {...useCases}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

