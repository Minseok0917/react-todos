export type Filter = "all" | "active" | "complete";

export interface Todo {
  id: number;
  text: string;
  edit: boolean;
  completed: boolean;
}

export interface State {
  todos: Todo[];
  todoText: string;
  todoFilter: Filter;
}
