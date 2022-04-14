import React, { useContext, useState } from "react";
import styles from "./Column.module.css";
import { AddOutline } from "react-ionicons";
import { EllipsisHorizontalOutline } from "react-ionicons";
import Note from "./Note";
import NewNoteInput from "./NewNoteInput";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/types";
import { NoteInterface } from "../types";
import { ListContext } from "../store/list-context";

interface ColumnProps {
  category: string;
  idColumn: number;
}

export const Column: React.FC<ColumnProps> = (props) => {
  const ctx = useContext(ListContext);
  const [addOutlineColor, setAddOutlineColor] = useState<string>("#00000");
  const [newNoteInputIsVisible, setNewNoteInputIsVisible] =
    useState<boolean>(false);
  const onDrop = (item: NoteInterface) => {
    ctx.setTextNotes((prevState) => {
      const newState = prevState
        .filter((i) => i.idNote !== item.idNote)
        .concat({ ...item, category: props.category });
      return newState;
    });
  };

  const [{ isOver, handlerId }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: NoteInterface, monitor) => onDrop(item),
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

  const onNewNoteInputIsHidden = () => {
    setNewNoteInputIsVisible(false);
  };

  const onAddNoteClickHandler = (item: NoteInterface) => {
    console.log(item);
    ctx.setTextNotes((prevState) => {
      return [...prevState, item];
    });
  };

  const onDeleteNoteHandler = (id: number) => {
    ctx.setTextNotes((prevState) => {
      const textNotesCopy = [...prevState];
      const filteredTextNotes = textNotesCopy.filter(
        (item) => item.idNote !== id
      );
      return filteredTextNotes;
    });
  };

  const onAddHover = () => setAddOutlineColor("#87CEFA");
  const onAddLeave = () => setAddOutlineColor("#00000");

  return (
    <div className={styles["Column-main"]}>
      <header className={styles["Column-header"]}>
        <div className={styles["Column-header__left-menu"]}>
          <div className={styles["Column-header__left-menu__badge"]}>1</div>
          <div className={styles["Column-header__left-menu__title"]}>
            {props.category}
          </div>
        </div>
        <div className={styles["Column-header__right-menu"]}>
          <div onMouseOver={onAddHover} onMouseLeave={onAddLeave}>
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
            onNewNoteInputIsHidden={onNewNoteInputIsHidden}
            onAddNoteClickHandler={onAddNoteClickHandler}
            category={props.category}
          />
        )}
      </div>
      <div className={styles["Column-scrollable"]} ref={drop}>
        {ctx.textNotes
          .filter((note) => note.category === props.category)
          .map((item) => (
            <Note
              text={item.text}
              key={item.idNote}
              idNote={item.idNote}
              onDeleteNoteHandler={onDeleteNoteHandler}
              category={props.category}
            />
          ))}
      </div>
    </div>
  );
};
