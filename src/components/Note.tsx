import styles from "./Note.module.css";
import { ReorderTwoOutline, TrashOutline } from "react-ionicons";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/types";
import { NoteProps } from "../types/types-index";

const Note: React.FC<NoteProps> = (props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { text: props.text, idNote: props.idNote, category: props.category },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    end: (item, monitor) => {
      console.log(monitor.getDropResult());
    },
  }));

  const trashNoteClickHandler = () => {
    props.onDeleteNote(props.idNote);
  };

  return (
    <div
      className={styles["note-main"]}
      ref={drag}
      style={{ opacity: isDragging ? "0.5" : "1" }}
      key={props.idNote}
    >
      <div className={styles["note-main__reordericon"]}>
        <ReorderTwoOutline color={"#00000"} height="25px" width="25px" />
      </div>
      <div className={styles["note-main__notetext"]}>{props.text}</div>
      <div className={styles["note-main__ellipsisicon"]}>
        <TrashOutline
          color={"#00000"}
          height="20px"
          width="20px"
          onClick={trashNoteClickHandler}
        />
      </div>
    </div>
  );
};

export default Note;
