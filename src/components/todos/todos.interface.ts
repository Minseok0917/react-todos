export type Filter = "ALL" | "ACTIVE" | "COMPLETE";

export interface Todo {
  id: number;
  text: string;
  edit: boolean;
  completed: boolean;
}

export interface State {
  todos: Todo[];
  todoText: String;
  filter: Filter;
}
