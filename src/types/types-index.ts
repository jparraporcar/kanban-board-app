import { SetStateAction } from "react";

export interface INote {
  text: string;
  idNote: number;
  category: string;
}

export interface IColumn {
  category: string;
  idColumn: number;
}

export interface IMainContext {
  textNotes: INote[];
  setTextNotes: React.Dispatch<SetStateAction<INote[]>>;
  addColumnHandler: (events: any) => void;
  columnCategoryRef: React.RefObject<HTMLInputElement>;
  columns: IColumn[];
}

export interface NewNoteInputProps {
  onNewNoteInputIsHidden: () => void;
  onAddNoteClickHandler: (item: INote) => void;
  category: string;
}

export interface ColumnProps {
  category: string;
  idColumn: number;
}

export interface NoteProps {
  text: string;
  idNote: number;
  category: string;
  onDeleteNote: (id: number) => void;
}
