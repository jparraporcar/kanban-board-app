import React, { useContext, useState } from "react";
import styles from "./Column.module.css";
import { AddOutline } from "react-ionicons";
import { EllipsisHorizontalOutline } from "react-ionicons";
import Note from "./Note";
import NewNoteInput from "./NewNoteInput";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/types";
import { ColumnProps, INote } from "../types/types-index";
import { MainContext } from "../store/main-context";

export const Column: React.FC<ColumnProps> = (props) => {
  const [notesCount, setNotesCount] = useState<number>(0);
  const [addOutlineColor, setAddOutlineColor] = useState<string>("#00000");
  const [newNoteInputIsVisible, setNewNoteInputIsVisible] =
    useState<boolean>(false);
  const mainCtx = useContext(MainContext);

  const onDrop = (item: INote) => {
    mainCtx.setTextNotes((prevState) => {
      const newState = prevState
        .filter((i) => i.idNote !== item.idNote)
        .concat({ ...item, category: props.category });
      return newState;
    });
    // notesCounter();
  };

  const [{ isOver, handlerId }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: INote, monitor) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      console.log(monitor.getClientOffset());
      console.log(handlerId);
    },
  }));

  const onNewNoteInputIsVisible = () => {
    setNewNoteInputIsVisible(true);
  };

  const newNoteInputIsHiddenHandler = () => {
    setNewNoteInputIsVisible(false);
  };

  // const notesCounter = () => {
  //   let numberOfNotesInSameCategory: number;
  //   mainCtx.textNotes.forEach((note) => {
  //     if (note.category === props.category) {
  //       numberOfNotesInSameCategory += 1;
  //     }
  //     setNotesCount(numberOfNotesInSameCategory);
  //   });
  // };

  const addNoteClickHandler = (item: INote) => {
    mainCtx.setTextNotes((prevState) => {
      return [...prevState, item];
    });
    // notesCounter();
  };

  const deleteNoteHandler = (id: number) => {
    setNotesCount((prevState) => prevState - 1);
    mainCtx.setTextNotes((prevState) => {
      const textNotesCopy = [...prevState];
      const filteredTextNotes = textNotesCopy.filter(
        (item) => item.idNote !== id
      );
      return filteredTextNotes;
    });
  };

  const mouseHoverHandler = () => setAddOutlineColor("#87CEFA");
  const mouseLeaveHandler = () => setAddOutlineColor("#00000");

  return (
    <div className={styles["Column-main"]}>
      <header className={styles["Column-header"]}>
        <div className={styles["Column-header__left-menu"]}>
          <div className={styles["Column-header__left-menu__badge"]}>
            {notesCount}
          </div>
          <div className={styles["Column-header__left-menu__title"]}>
            {props.category}
          </div>
        </div>
        <div className={styles["Column-header__right-menu"]}>
          <div onMouseOver={mouseHoverHandler} onMouseLeave={mouseLeaveHandler}>
            <AddOutline
              color={addOutlineColor}
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
            onNewNoteInputIsHidden={newNoteInputIsHiddenHandler}
            onAddNoteClickHandler={addNoteClickHandler}
            category={props.category}
          />
        )}
      </div>
      <div className={styles["Column-scrollable"]} ref={drop}>
        {mainCtx.textNotes
          .filter((note) => note.category === props.category)
          .map((item) => (
            <Note
              text={item.text}
              key={item.idNote}
              idNote={item.idNote}
              onDeleteNote={deleteNoteHandler}
              category={props.category}
            />
          ))}
      </div>
    </div>
  );
};
