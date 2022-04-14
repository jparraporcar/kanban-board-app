import React, { useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import "./App.css";
import { Column } from "./components/Column";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ColumnInterface } from "./types";

function App() {
  const [columns, setColumns] = useState<ColumnInterface[]>([]);
  const columnCategoryRef = useRef<HTMLInputElement>(null);

  const addColumnHandler = (event: any) => {
    event.preventDefault();
    const newColumn: ColumnInterface = {
      category: columnCategoryRef.current!.value,
      idColumn: Math.random(),
    };
    setColumns((prevState) => {
      return [...prevState, newColumn];
    });
    columnCategoryRef.current!.value = "";
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App-main">
        <div className="App-form">
          <form>
            <button onClick={addColumnHandler}>Add Column</button>
            <input
              type="text"
              ref={columnCategoryRef}
              style={{ marginTop: "10px" }}
            />
          </form>
        </div>
        <div className="App-columns">
          {columns.map((column) => (
            <Column
              key={column.idColumn}
              category={column.category}
              idColumn={column.idColumn}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
