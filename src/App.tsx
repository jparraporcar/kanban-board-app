import React, { useState } from "react";
import "./App.css";
import { Column } from "./components/Column";

function App() {
  const [columns, setColumns] = useState<JSX.Element[]>([
    <Column columnTitle="Backlog" />,
  ]);

  const addColumnHandler = () => {
    console.log(columns.length);
    setColumns((prevState) => [...prevState, <Column columnTitle="xxx" />]);
  };

  return (
    <div className="App">
      <div>
        <button onClick={addColumnHandler}>Add Column</button>
      </div>
      {columns}
    </div>
  );
}

export default App;
