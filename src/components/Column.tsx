import React, { PropsWithChildren } from "react";
import "./Column.modules.css";
import { AddOutline } from "react-ionicons";
import { EllipsisHorizontalOutline } from "react-ionicons";
import { useContext } from "react";
import { MainContext } from "../store/main-context";

interface ColumnProps {
  columnTitle: string;
}

export const Column: React.FC<PropsWithChildren<ColumnProps>> = (props) => {
  const MainCtx = useContext(MainContext);
  const createNewNodeInputHandler = () => {
    MainCtx.setNewNoteInputIsVisible(true);
  };

  return (
    <div className="Column-main">
      <header className="Column-header">
        <div className="Column-main__left-menu">
          <div className="Column-main__left-menu__badge">10</div>
          <div className="Column-main__left-menu__title">
            {props.columnTitle}
          </div>
        </div>
        <div className="Column-main__right-menu">
          <div>
            <AddOutline
              color={"#00000"}
              height="25px"
              width="25px"
              onClick={createNewNodeInputHandler}
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
