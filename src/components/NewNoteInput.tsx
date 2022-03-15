//TODO: Have a look at the overflow property one the component is setup, see link below:
//      https://www.w3schools.com/cssref/css3_pr_resize.asp
//TODO: Talk with Alex about how to setup the margin between the buttons and the textarea
//      in order to have exactly 10px. 5px of bottom margin of the textarea apparently are the same
//      as 10pxx of left and right margin of the same textarea div parent

import styles from "./NewNoteInput.module.css";

import React from "react";
import { MainContext } from "../store/main-context";
import { useContext, useRef } from "react";

const NewNoteInput: React.FC = () => {
  const textAreaElement = useRef<HTMLTextAreaElement>(null);
  const mainCtx = useContext(MainContext);

  const cancelNewNoteInputHandler = () => {
    mainCtx.setNewNoteInputIsVisible(false);
  };

  //TODO: By the moment I am going to add ! to bypass the Typescript check but later It will be necessary to add
  // some sort of validation
  //TODO: Here it is necessary to ensure that the states are going to be called in the order stablished, something
  // that at the moment Im not sure if it will be like this... how React schedules states updates?
  const addNewNoteInoutHandler = () => {
    mainCtx.setNoteText((prevState) => {
      return [...prevState, textAreaElement.current!.value];
    });
    mainCtx.setNoteIsVisible(true);
  };

  return (
    <div className={styles["newnoteinput-main"]}>
      <textarea placeholder="Enter a note" ref={textAreaElement}></textarea>
      <div className={styles["newnoteinput-buttons"]}>
        <button
          className={styles["button-add"]}
          onClick={addNewNoteInoutHandler}
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
