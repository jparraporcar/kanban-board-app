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
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 0,
              margin: 0,
              width: "137px",
            }}
          >
            <input type="text" ref={columnCategoryRef} />
            <button
              onClick={addColumnHandler}
              style={{ width: "139px", padding: 0, margin: 0 }}
            >
              Add Column
            </button>
          </form>
        </div>
        {columns.map((column) => (
          <Column
            key={column.idColumn}
            category={column.category}
            idColumn={column.idColumn}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default App;
