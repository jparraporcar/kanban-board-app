import React, { useRef, useState } from "react";
import { IColumn, IMainContext, INote } from "../types/types-index";

export const MainContext = React.createContext({} as IMainContext);

export const ListContextProvider: React.FC = (props) => {
  const [textNotes, setTextNotes] = useState<INote[]>([]);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const columnCategoryRef = useRef<HTMLInputElement>(null);

  const addColumnHandler = (event: any) => {
    event.preventDefault();

    if (columns.length > 0) {
      const sameCategoryIsFound = columns.findIndex((column) => {
        console.log(column.category.trim().toLowerCase());
        console.log(columnCategoryRef.current!.value.trim().toLowerCase());
        return (
          column.category.trim().toLowerCase() ===
          columnCategoryRef.current!.value.trim().toLowerCase()
        );
      });
      console.log(sameCategoryIsFound);
      if (sameCategoryIsFound !== -1) {
        alert(
          "The category name already exists, please introduce another category name"
        );
        return;
      }
    }

    if (columnCategoryRef.current!.value.trim().length === 0) {
      alert(
        "The column description cannot be empty, please introduce a description text"
      );
      return;
    }

    const newColumn: IColumn = {
      category: columnCategoryRef.current!.value,
      idColumn: Math.random(),
    };
    setColumns((prevState) => {
      return [...prevState, newColumn];
    });
    columnCategoryRef.current!.value = "";
  };

  const contextValue: IMainContext = {
    textNotes,
    setTextNotes,
    addColumnHandler,
    columnCategoryRef,
    columns,
  };
  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
};
