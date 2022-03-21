//TODO: Have a look at the overflow property one the component is setup, see link below:
//      https://www.w3schools.com/cssref/css3_pr_resize.asp
//TODO: Talk with Alex about how to setup the margin between the buttons and the textarea
//      in order to have exactly 10px. 5px of bottom margin of the textarea apparently are the same
//      as 10pxx of left and right margin of the same textarea div parent

import styles from "./NewNoteInput.module.css";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";

interface NewNoteInputProps {
  onNewNoteInputIsHidden: () => void;
  onAddNoteClickHandler: (text: string) => void;
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
  // that at the moment Im not sure if it will be like this... how React schedules states updates?
  const addNewNoteInputHandler = () => {
    props.onAddNoteClickHandler(textAreaElement.current!.value);
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
