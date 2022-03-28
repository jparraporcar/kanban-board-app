import React, { SetStateAction, useState } from "react";
import { NoteInterface } from "../types";

interface ListContextInterface {
  textNotes: NoteInterface[];
  setTextNotes: React.Dispatch<SetStateAction<NoteInterface[]>>;
}

export const ListContext = React.createContext({} as ListContextInterface);

export const ListContextProvider: React.FC = (props) => {
  const [textNotes, setTextNotes] = useState<NoteInterface[]>([]);

  const contextValue: ListContextInterface = {
    textNotes: textNotes,
    setTextNotes: setTextNotes,
  };
  return (
    <ListContext.Provider value={contextValue}>
      {props.children}
    </ListContext.Provider>
  );
};
