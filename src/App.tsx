import React from "react";
import "./App.css";
import { Column } from "./components/Column";
import { useContext } from "react";
import { MainContext } from "./store/main-context";

function App() {
  const MainCtx = useContext(MainContext);
  return (
    <div className="App">
      <Column columnTitle="Backlog">
        {MainCtx.newNoteInputIsVisible && <div>THIS IS A TEST</div>}
      </Column>
    </div>
  );
}

export default App;
