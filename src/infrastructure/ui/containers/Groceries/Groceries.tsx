import { List, Menu, Views } from "../../components";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store";

export function Groceries() {
  const { items, useCases } = useStore();
  const [lastSearch, setLastSearch] = useState("");
  const [view, setView] = useState(Views.All);

  useEffect(() => {
    useCases.getAllItems();
  }, [useCases, view]);

  return (
    <>
      {view === Views.All && <List items={items.search(lastSearch).getAll()} />}
      {view === Views.Required && (
        <List items={items.search(lastSearch).getAllRequired()} />
      )}
      {view === Views.Mandatory && (
        <List items={items.search(lastSearch).getAllMandatory()} />
      )}
      <Menu activeView={view} setView={setView} onSearch={setLastSearch} />
    </>
  );
}
