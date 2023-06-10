import React, { useContext, useEffect, useState } from "react";
import styles from "./Column.module.css";
import { AddOutline, TrashOutline } from "react-ionicons";
import Note from "./Note";
import NewNoteInput from "./NewNoteInput";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/types";
import { ColumnProps, INote } from "../types/types-index";
import { MainContext } from "../store/main-context";

export const Column: React.FC<ColumnProps> = (props) => {
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

  const addNoteClickHandler = (item: INote) => {
    mainCtx.setTextNotes((prevState) => {
      return [...prevState, item];
    });
  };

  const deleteNoteHandler = (id: number) => {
    mainCtx.setTextNotes((prevState) => {
      const textNotesCopy = [...prevState];
      const filteredTextNotes = textNotesCopy.filter(
        (item) => item.idNote !== id
      );
      return filteredTextNotes;
    });
  };

  const trashColumnClickHandler = () => {
    mainCtx.setColumns((prevState) => {
      const columnsCopy = [...prevState];
      const filteredColumns = columnsCopy.filter(
        (item) => item.idColumn !== props.idColumn
      );
      return filteredColumns;
    });
    mainCtx.setTextNotes((prevState) => {
      const textNotesCopy = [...prevState];
      const filteredTextNotes = textNotesCopy.filter(
        (item) => item.category !== props.category
      );
      return filteredTextNotes;
    });
  };

  const mouseHoverHandler = () => setAddOutlineColor("#87CEFA");
  const mouseLeaveHandler = () => setAddOutlineColor("#00000");

  useEffect(() => {
    localStorage.setItem("textNotes", JSON.stringify(mainCtx.textNotes));
  }, [mainCtx.textNotes]);

  return (
    <div className={styles["Column-main"]}>
      <header className={styles["Column-header"]}>
        <div className={styles["Column-header__left-menu"]}>
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
            <TrashOutline
              color={"#00000"}
              height="20px"
              width="20px"
              onClick={trashColumnClickHandler}
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
