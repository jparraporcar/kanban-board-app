//TODO: Have a look at the overflow property one the component is setup, see link below:
//      https://www.w3schools.com/cssref/css3_pr_resize.asp

import styles from "./NewNoteInput.module.css";
import React, { MouseEventHandler, useRef, useState } from "react";
import { NoteInterface } from "../types";
import { EventEmitter } from "stream";

interface NewNoteInputProps {
  onNewNoteInputIsHidden: () => void;
  onAddNoteClickHandler: (item: NoteInterface) => void;
  category: string;
}

const NewNoteInput: React.FC<NewNoteInputProps> = (props) => {
  const [noteText, setNoteText] = useState<string[]>([]);
  const textAreaElement = useRef<HTMLTextAreaElement>(null);

  const cancelNewNoteInputHandler = () => {
    props.onNewNoteInputIsHidden();
  };

  //TODO: By the moment I am going to add ! to bypass the Typescript check but later It will be necessary to add
  // some sort of validation
  //TODO: Here it is necessary to ensure that the states are going to be called in the order stablished, something

  const addNewNoteInputHandler = () => {
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
