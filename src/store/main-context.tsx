import React, { useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";

interface MainContextInterface {
  newNoteInputIsVisible: boolean;
  setNewNoteInputIsVisible: Dispatch<SetStateAction<boolean>>;
}

export const MainContext = React.createContext<MainContextInterface>({
  newNoteInputIsVisible: false,
  setNewNoteInputIsVisible: () => {},
});

export const MainContextProvider: React.FC = (props) => {
  const [newNoteInputIsVisible, setNewNoteInputIsVisible] = useState(false);

  return (
    <MainContext.Provider
      value={{
        newNoteInputIsVisible: newNoteInputIsVisible,
        setNewNoteInputIsVisible: setNewNoteInputIsVisible,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
