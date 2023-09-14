import React from "react";
import { useIdGenerator, useLocalStorage, useDebounce } from "@/hooks/helpers";
import { TodoPresenter } from "@components/todos";
import { Filter, Todo, State } from "@components/todos/todos.interface";

export default function Todos() {
  const idGenerator = useIdGenerator("todoId");
  const [state, setState] = useLocalStorage<State>("todos", {
    todos: [],
    todoText: "",
    todoFilter: "all",
  });
  const todos = state.todos.filter((todo: Todo) => {
    if (state.todoFilter === "active") return !todo.completed;
    if (state.todoFilter === "complete") return todo.completed;
    return true;
  });
  const filters: Filter[] = ["all", "active", "complete"];
  const activeTodoCount: number = state.todos.filter(({ completed }: Todo) => !completed).length;
  const isAllCompleted: boolean = state.todos.every(({ completed }: Todo) => completed);
  const isExistCompletedTodo: boolean = state.todos.some(({ completed }: Todo) => completed);

  const todoGenerator = (text: string): Todo => ({
    text,
    id: idGenerator.getId(),
    edit: false,
    completed: false,
  });
  const applyCallbackToTodoByIdWithClone = (
    id: number,
    callback: (todo: Todo, todos: Todo[]) => void
  ): [todo: Todo | undefined, todos: Todo[]] => {
    const todos = structuredClone(state.todos);
    const todo = todos.find((todo: Todo) => todo.id === id);
    if (todo) callback(todo, todos);
    return [todo, todos];
  };

  const handleTodoTextChange = useDebounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const todoText = event.target.value;
    console.log(event);
    setState({ ...state, todoText });
  }, 300);
  const handleTodoTextKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isValid = state.todoText.trim().length > 0;
    const isCreated = ["Tab", "Enter"].includes(event.key) && isValid;
    if (!isCreated) return;

    const todo: Todo = todoGenerator(state.todoText);
    setState({ ...state, todos: [...state.todos, todo], todoText: "" });
  };
  const handleToggleAllClick = () => {
    const todos = state.todos.map((todo: Todo) => ({ ...todo, completed: !isAllCompleted }));
    setState({ ...state, todos });
  };
  const handleCheckBoxClick = (id: number) => {
    applyCallbackToTodoByIdWithClone(id, (todo, todos) => {
      todo.completed != todo.completed;
      setState({ ...state, todos });
    });
  };
  const handleTextDoubleClick = (id: number) => {
    applyCallbackToTodoByIdWithClone(id, (todo, todos) => {
      todo.edit = true;
      setState({ ...state, todos });
    });
  };
  const handleEditInputBlur = (id: number) => {
    applyCallbackToTodoByIdWithClone(id, (todo, todos) => {
      todo.edit = false;
      setState({ ...state, todos });
    });
  };
  const handleEditInputChange = (event: React.FormEvent<HTMLInputElement>, id: number) => {
    applyCallbackToTodoByIdWithClone(id, (todo, todos) => {
      todo.text = event.currentTarget.value;
      setState({ ...state, todos });
    });
  };
  const handleEditInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    const isValid = event.currentTarget.value.trim().length > 0;
    const isUpdated = ["Tab", "Enter"].includes(event.key);
    if (!isUpdated) return;

    const todos = isValid
      ? applyCallbackToTodoByIdWithClone(id, (todo) => (todo.edit = false))[1]
      : state.todos.filter((todo: Todo) => todo.id !== id);
    setState({ ...state, todos });
  };
  const handleDeleteClick = (id: number) => {
    const todos: Todo[] = state.todos.filter((todo: Todo) => todo.id !== id);
    setState({ ...state, todos });
  };
  const handleFilterChange = (filterName: Filter) => {
    setState({ ...state, todoFilter: filterName });
  };
  const handleClearCompleteClick = () => {
    const todos: Todo[] = state.todos.filter(({ completed }: Todo) => !completed);
    setState({ ...state, todos });
  };
  return (
    <TodoPresenter
      state={state}
      filters={filters}
      currentTodos={todos}
      activeTodoCount={activeTodoCount}
      isAllCompletedTodo={isAllCompleted}
      isExistCompletedTodo={isExistCompletedTodo}
      handleTodoTextChange={handleTodoTextChange}
      handleTodoTextKeydown={handleTodoTextKeydown}
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

/* export default function Todos() {
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

`  return (
    <TodoPresenter
      state={state}
      filters={filters}
      currentTodos={todos}
      activeTodoCount={activeTodoCount}
      isAllCompletedTodo={isAllCompletedTodo}
      isExistCompletedTodo={isExistCompletedTodo}
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
  );`
}
 */
