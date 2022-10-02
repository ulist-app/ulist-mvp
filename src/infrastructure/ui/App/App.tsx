import React, { useEffect } from "react";
import "./App.scss";
import { UseCases } from "../../../application";
import { palette } from "../../../domain";
import { initStore } from "../store";
import { Groceries } from "../containers";

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
        <Groceries />
      </main>
    </div>
  );
}

export default App;
