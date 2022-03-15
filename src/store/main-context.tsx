import React, { useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";

interface MainContextInterface {
  newNoteInputIsVisible: boolean;
  setNewNoteInputIsVisible: Dispatch<SetStateAction<boolean>>;
  noteText: string[];
  setNoteText: Dispatch<SetStateAction<string[]>>;
  noteIsVisible: boolean;
  setNoteIsVisible: Dispatch<SetStateAction<boolean>>;
}

export const MainContext = React.createContext<MainContextInterface>({
  newNoteInputIsVisible: false,
  setNewNoteInputIsVisible: () => {},
  noteText: [],
  setNoteText: () => {},
  noteIsVisible: false,
  setNoteIsVisible: () => {},
});

export const MainContextProvider: React.FC = (props) => {
  const [newNoteInputIsVisible, setNewNoteInputIsVisible] =
    useState<boolean>(false);
  const [noteText, setNoteText] = useState<string[]>([]);
  const [noteIsVisible, setNoteIsVisible] = useState<boolean>(false);

  return (
    <MainContext.Provider
      value={{
        newNoteInputIsVisible,
        setNewNoteInputIsVisible,
        noteText,
        setNoteText,
        noteIsVisible,
        setNoteIsVisible,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
