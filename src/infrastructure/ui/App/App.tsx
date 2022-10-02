import React, { useEffect } from "react";
import "./App.scss";
import { UseCases } from "../../../application";
import { palette } from "../../../domain";
import { initStore } from "../store";
import { Groceries } from "../containers";
import { Route } from "wouter";
import { ItemCRUD } from "../views/ItemCRUD";
import { SettingsCRUD } from "../views/SettingsCRUD";

function App(props: UseCases) {
  useEffect(() => {
    initStore(props);
  }, [props]);

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
        <Route path="/" component={Groceries} />
        <Route path="/settings" component={SettingsCRUD} />
        <Route path="/items/:id" component={ItemCRUD} />
      </main>
    </div>
  );
}

export default App;
