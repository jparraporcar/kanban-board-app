import styles from "./Note.module.css";
import { EllipsisHorizontalOutline } from "react-ionicons";
import { ReorderTwoOutline } from "react-ionicons";
import { SetStateAction, useContext } from "react";

interface NoteProps {
  noteText: string;
}

const Note: React.FC<NoteProps> = (props) => {
  return (
    <div className={styles["note-main"]}>
      <div className={styles["note-main__reordericon"]}>
        <ReorderTwoOutline color={"#00000"} height="25px" width="25px" />
      </div>
      <div className={styles["note-main__notetext"]}>
        <span>{props.noteText}</span>
      </div>
      <div className={styles["note-main__ellipsisicon"]}>
        <EllipsisHorizontalOutline
          color={"#00000"}
          height="25px"
          width="25px"
        />
      </div>
    </div>
  );
};

export default Note;
