import React, { useState } from "react";
import styles from "./Column.module.css";
import { AddOutline } from "react-ionicons";
import { EllipsisHorizontalOutline } from "react-ionicons";
import Note from "./Note";
import NewNoteInput from "./NewNoteInput";

interface ColumnProps {
  columnTitle: string;
}

export const Column: React.FC<ColumnProps> = (props) => {
  const [newNoteInputIsVisible, setNewNoteInputIsVisible] =
    useState<boolean>(false);
  const [noteIsVisible, setNoteIsVisible] = useState<boolean>(false);
  const [textNotes, setTextNotes] = useState<string[]>([]);
  const [notesNum, setNotesNum] = useState<number>(0);

  const onNewNoteInputIsVisible = () => {
    setNewNoteInputIsVisible(true);
  };

  const onNewNoteInputIsHidden = () => {
    setNewNoteInputIsVisible(false);
  };

  const onAddNoteClickHandler = (text: string) => {
    setTextNotes((prevState) => {
      return [...prevState, text];
    });
    setNoteIsVisible(true);
    setNotesNum((prevState) => prevState + 1);
  };

  return (
    <div className={styles["Column-main"]}>
      <header className={styles["Column-header"]}>
        <div className={styles["Column-header__left-menu"]}>
          <div className={styles["Column-header__left-menu__badge"]}>
            {notesNum}
          </div>
          <div className={styles["Column-header__left-menu__title"]}>
            {props.columnTitle}
          </div>
        </div>
        <div className={styles["Column-header__right-menu"]}>
          <div>
            <AddOutline
              color={"#00000"}
              height="25px"
              width="25px"
              onClick={onNewNoteInputIsVisible}
            />
          </div>
          <div>
            <EllipsisHorizontalOutline
              color={"#00000"}
              height="25px"
              width="25px"
            />
          </div>
        </div>
      </header>
      <div>
        {newNoteInputIsVisible && (
          <NewNoteInput
            onNewNoteInputIsHidden={onNewNoteInputIsHidden}
            onAddNoteClickHandler={onAddNoteClickHandler}
          />
        )}
      </div>
      <div className={styles["Column-scrollable"]}>
        {noteIsVisible && textNotes.map((note) => <Note noteText={note} />)}
      </div>
    </div>
  );
};
