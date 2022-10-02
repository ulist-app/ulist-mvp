import React, { useEffect } from "react";
import "./App.scss";
import { palette } from "../../../domain";
import { initStore } from "../store";
import { Groceries } from "../containers";
import { Link, Route, Router, useRoute } from "wouter";
import { ItemCRUD } from "../views/ItemCRUD";
import { SettingsCRUD } from "../views/SettingsCRUD";

function App() {
  const [match] = useRoute("/");
  useEffect(() => {
    initStore();
  }, []);

  return (
    <Router base="/ulist-mvp">
      <div className="App">
        <header
          className="App-header"
          style={{
            backgroundColor: palette.purple,
            color: palette.white,
          }}
        >
          <span>{!match && <Link to="/">🔙</Link>}</span>
          <span>🛒 Groceries list 🛒</span>
          <span>
            <Link to="/settings">⚙️</Link>
          </span>
        </header>
        <main className="App-main">
          <Route path="/" component={Groceries} />
          <Route path="/settings" component={SettingsCRUD} />
          <Route path="/items/:id" component={ItemCRUD} />
        </main>
      </div>
    </Router>
  );
}

export default App;
