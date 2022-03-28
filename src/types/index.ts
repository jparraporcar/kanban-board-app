// ColumnId is the id of the column where the note is dragged from
export interface NoteInterface {
    text: string;
    idNote: number;
    category: string;
  }

export interface ColumnInterface {
    category: string
    idColumn: number
  }