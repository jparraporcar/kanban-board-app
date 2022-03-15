import React, { PropsWithChildren } from "react";
import styles from "./Column.module.css";
import { AddOutline } from "react-ionicons";
import { EllipsisHorizontalOutline } from "react-ionicons";
import { useContext } from "react";
import { MainContext } from "../store/main-context";

interface ColumnProps {
  columnTitle: string;
}

export const Column: React.FC<PropsWithChildren<ColumnProps>> = (props) => {
  const MainCtx = useContext(MainContext);
  const createNewNoteInputHandler = () => {
    MainCtx.setNewNoteInputIsVisible(true);
  };

  return (
    <div className={styles["Column-main"]}>
      <header className={styles["Column-header"]}>
        <div className={styles["Column-main__left-menu"]}>
          <div className={styles["Column-main__left-menu__badge"]}>10</div>
          <div className={styles["Column-main__left-menu__title"]}>
            {props.columnTitle}
          </div>
        </div>
        <div className={styles["Column-main__right-menu"]}>
          <div>
            <AddOutline
              color={"#00000"}
              height="25px"
              width="25px"
              onClick={createNewNoteInputHandler}
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
      <main>{props.children}</main>
    </div>
  );
};
