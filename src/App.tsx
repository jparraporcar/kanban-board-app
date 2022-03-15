import React from "react";
import "./App.css";
import { Column } from "./components/Column";
import { useContext } from "react";
import { MainContext } from "./store/main-context";
import NewNoteInput from "./components/NewNoteInput";
import Note from "./components/Note";

function App() {
  const mainCtx = useContext(MainContext);
  return (
    <div className="App">
      <Column columnTitle="Backlog">
        {mainCtx.newNoteInputIsVisible && <NewNoteInput />}
        {mainCtx.noteIsVisible &&
          mainCtx.noteText.map((text) => <Note noteText={text} />)}
      </Column>
    </div>
  );
}

export default App;
