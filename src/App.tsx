import React, { useContext, useEffect } from "react";
import { DndProvider } from "react-dnd";
import "./App.css";
import { Column } from "./components/Column";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MainContext } from "./store/main-context";

const App: React.FC = () => {
  const mainCtx = useContext(MainContext);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(mainCtx.columns));
  }, [mainCtx.columns]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App-main">
        <div className="App-form">
          <form>
            <button onClick={mainCtx.addColumnHandler}>Add Column</button>
            <input
              type="text"
              ref={mainCtx.columnCategoryRef}
              style={{ marginTop: "10px" }}
            />
          </form>
        </div>
        <div className="App-columns">
          {mainCtx.columns.map((column) => (
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
};

export default App;
