import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./infrastructure/ui/App/App";
import reportWebVitals from "./reportWebVitals";
import {
  ItemRepositoryLocalStorage,
  LocalStorageItemRecord,
  SettingsRepositoryLocalStorage,
} from "./infrastructure/repositories";
import {
  LocalStorage,
  LocalStorageCollection,
} from "./infrastructure/data-sources";
import { generateUseCases } from "./application";
import { Settings } from "./domain";

const itemRepository = new ItemRepositoryLocalStorage(
  new LocalStorage<LocalStorageItemRecord>(LocalStorageCollection.Items)
);
const settingsRepository = new SettingsRepositoryLocalStorage(
  new LocalStorage<Settings>(LocalStorageCollection.Settings)
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App {...generateUseCases({ itemRepository, settingsRepository })} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
