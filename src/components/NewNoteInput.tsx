import styles from "./NewNoteInput.module.css";
import React, { useRef } from "react";
import { INote, NewNoteInputProps } from "../types/types-index";

const NewNoteInput: React.FC<NewNoteInputProps> = (props) => {
  const textAreaElement = useRef<HTMLTextAreaElement>(null);

  const cancelNewNoteInputHandler = () => {
    props.onNewNoteInputIsHidden();
  };

  const addNewNoteInputHandler = () => {
    if (textAreaElement.current!.value.trim().length === 0) {
      alert(
        "The text area cannot be empty, please introduce a description text"
      );
      return;
    }

    const item = {
      text: textAreaElement.current!.value,
      idNote: Math.random(),
      category: props.category,
    };
    props.onAddNoteClickHandler(item);
  };

  return (
    <div className={styles["newnoteinput-main"]}>
      <textarea placeholder="Enter a note" ref={textAreaElement}></textarea>
      <div className={styles["newnoteinput-buttons"]}>
        <button
          className={styles["button-add"]}
          onClick={addNewNoteInputHandler}
        >
          Add
        </button>
        <button
          className={styles["button-cancel"]}
          onClick={cancelNewNoteInputHandler}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewNoteInput;
