import React from "react";
import { useLocalStorage } from "@/hooks/storage";
import { TodoPresenter } from "@components/todos";
import { Filter, Todo, State } from "@components/todos/todos.interface";

export default function Todos() {
  const initalState = (): State => ({
    todos: [],
    todoText: "",
    filter: "ALL",
  });
  const [id, setId] = useLocalStorage("todoId", 0);
  const [state, setState] = useLocalStorage("todos", initalState(), {
    debounce: true,
    debounceDelay: 150,
  });

  const filters: Filter[] = ["ALL", "ACTIVE", "COMPLETE"];
  const todos: Todo[] = state.todos.filter((todo) => {
    if (state.filter === "ACTIVE") return !todo.completed;
    if (state.filter === "COMPLETE") return todo.completed;
    return true;
  });

  const activeTodoCount: number = state.todos.filter(({ completed }: Todo) => !completed).length;
  const isAllCompletedTodo: Boolean = state.todos.every(({ completed }: Todo) => completed);
  const isExistCompletedTodo: Boolean = state.todos.some(({ completed }: Todo) => completed);

  const createTodo = (text: string): Todo => ({
    id,
    text,
    completed: false,
    edit: false,
  });

  function handleCreateInputChange(event: React.FormEvent<HTMLInputElement>) {
    setState({ ...state, todoText: event.currentTarget.value });
  }
  function handleCreateInputKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    const inputValue = event.currentTarget.value.trim();
    const isCreated: Boolean = ["Tab", "Enter"].includes(event.key);
    const isValid: Boolean = inputValue.length > 0;
    if (isCreated && isValid) {
      const todo: Todo = createTodo(inputValue);
      setId(id + 1);
      setState({ ...state, todos: [...state.todos, todo], todoText: "" });
    }
  }

  function handleToggleAllClick() {
    const toggleTodos: Todo[] = state.todos.map((todo: Todo) => ({
      ...todo,
      completed: !isAllCompletedTodo,
    }));
    setState({ ...state, todos: [...toggleTodos] });
  }
  function handleCheckBoxClick(todo: Todo) {
    todo.completed = !todo.completed;
    setState({ ...state, todos: [...state.todos] });
  }
  function handleTextDoubleClick(todo: Todo) {
    todo.edit = true;
    setState({ ...state });
  }
  function handleEditInputBlur(todo: Todo) {
    todo.edit = false;
    setState({ ...state });
  }
  function handleEditInputChange(event: React.FormEvent<HTMLInputElement>, todo: Todo) {
    todo.text = event.currentTarget.value;
    setState({ ...state });
  }
  function handleEditInputKeydown(event: React.KeyboardEvent<HTMLInputElement>, editTodo: Todo) {
    const inputValue = event.currentTarget.value.trim();
    const isEdit: Boolean = ["Tab", "Enter"].includes(event.key);
    const isValid: Boolean = inputValue.length > 0;
    if (isEdit) {
      if (isValid) {
        editTodo.edit = false;
        setState({ ...state });
      } else {
        const notEditTodos: Todo[] = state.todos.filter((todo) => todo !== editTodo);
        setState({ ...state, todos: [...notEditTodos] });
      }
    }
  }
  function handleDeleteClick(deleteTodo: Todo) {
    const removeTodos: Todo[] = state.todos.filter((todo: Todo) => todo !== deleteTodo);
    setState({ ...state, todos: [...removeTodos] });
  }
  function handleFilterChange(filterName: Filter) {
    setState({ ...state, filter: filterName });
  }
  function handleClearCompleteClick() {
    const notCompleteTodos: Todo[] = state.todos.filter(({ completed }: Todo) => !completed);
    setState({ ...state, todos: [...notCompleteTodos] });
  }

  return (
    <TodoPresenter
      state={state}
      filters={filters}
      currentTodos={todos}
      handleCreateInputChange={handleCreateInputChange}
      handleCreateInputKeydown={handleCreateInputKeydown}
      handleToggleAllClick={handleToggleAllClick}
      handleCheckBoxClick={handleCheckBoxClick}
      handleTextDoubleClick={handleTextDoubleClick}
      handleEditInputBlur={handleEditInputBlur}
      handleEditInputChange={handleEditInputChange}
      handleEditInputKeydown={handleEditInputKeydown}
      handleDeleteClick={handleDeleteClick}
      handleFilterChange={handleFilterChange}
      handleClearCompleteClick={handleClearCompleteClick}
    />
  );
}
