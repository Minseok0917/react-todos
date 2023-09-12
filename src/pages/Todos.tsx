import React from "react";
import { BsTrash3, BsChevronCompactDown, BsCheckLg } from "react-icons/bs";
import * as Styled from "@components/todos/styled";
import { useLocalStorage } from "@/hooks/storage";
import { useDebounce } from "@/hooks/helpers";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  edit: boolean;
}
type Filter = "ALL" | "ACTIVE" | "COMPLETE";

interface State {
  todos: Todo[];
  todoText: String;
  filter: Filter;
}

export default function Todos() {
  const initalState: State = {
    todos: [],
    todoText: "",
    filter: "ALL",
  };
  const [id, setId] = useLocalStorage("todoId", 0);
  const [state, setState] = useLocalStorage("todos", initalState, {
    debounce: true,
    debounceDelay: 150,
  });

  const todoRefs = useRef<{ [key: number]: HTMLInputElement }>({});

  const isAllCompletedTodo: Boolean = state.todos.every(
    ({ completed }: Todo) => completed
  );

  const isExistCompletedTodo: Boolean = state.todos.some(
    ({ completed }: Todo) => completed
  );

  const activeTodoCount: number = state.todos.filter(
    ({ completed }: Todo) => !completed
  ).length;

  const filterServices = {
    ALL: () => state.todos,
    ACTIVE: () => state.todos.filter(({ completed }: Todo) => !completed),
    COMPLETE: () => state.todos.filter(({ completed }: Todo) => completed),
  };
  const currentTodos = useMemo(
    () => filterServices[state.filter](),
    [state.todos, state.filter]
  );

  const handlers = {
    inputChange(event: React.FormEvent<HTMLInputElement>) {
      setState({ ...state, todoText: event.currentTarget.value });
    },
    inputKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
      const inputValue = event.currentTarget.value.trim();
      const isCreated: Boolean = ["Tab", "Enter"].includes(event.key);
      const isValid: Boolean = inputValue.length > 0;
      if (isCreated && isValid) {
        const todo: Todo = {
          id,
          text: inputValue,
          completed: false,
          edit: false,
        };
        setId(id + 1);
        setState({ ...state, todos: [...state.todos, todo], todoText: "" });
      }
    },
    toggleAllTodos() {
      const toggleTodos: Todo[] = state.todos.map((todo: Todo) => ({
        ...todo,
        completed: !isAllCompletedTodo,
      }));
      setState({ ...state, todos: [...toggleTodos] });
    },
    toggleTodoCompleted(todo: Todo) {
      todo.completed = !todo.completed;
      setState({ ...state });
    },
    todoDoubleClick(todo: Todo) {
      todo.edit = true;
      setState({ ...state });
      setTimeout(() => todoRefs.current[todo.id].focus(), 0);
    },
    todoEditBlur(todo: Todo) {
      todo.edit = false;
      setState({ ...state });
    },
    todoEditTextChange(event: React.FormEvent<HTMLInputElement>, todo: Todo) {
      todo.text = event.currentTarget.value;
      setState({ ...state });
    },
    todoEditKeydown(
      event: React.KeyboardEvent<HTMLInputElement>,
      editTodo: Todo
    ) {
      const inputValue = event.currentTarget.value.trim();
      const isEdit: Boolean = ["Tab", "Enter"].includes(event.key);
      const isValid: Boolean = inputValue.length > 0;
      if (isEdit) {
        if (isValid) {
          editTodo.edit = false;
          setState({ ...state });
        } else {
          const notEditTodos: Todo[] = state.todos.filter(
            (todo) => todo !== editTodo
          );
          setState({ ...state, todos: [...notEditTodos] });
        }
      }
    },
    deleteTodo(deleteTodo: Todo) {
      const removeTodos: Todo[] = state.todos.filter(
        (todo: Todo) => todo !== deleteTodo
      );
      setState({ ...state, todos: [...removeTodos] });
    },
    changeFilter(filterName: Filter) {
      setState({ ...state, filter: filterName });
    },
    clearCompletedTodos() {
      const notCompleteTodos: Todo[] = state.todos.filter(
        ({ completed }: Todo) => !completed
      );
      setState({ ...state, todos: [...notCompleteTodos] });
    },
  };

  return (
    <Styled.Todos>
      <Styled.TodoHead>
        <Styled.TodoTitle>TODOS</Styled.TodoTitle>
        <Styled.TodoInputArea>
          <Styled.TodoCompleteToggleIcon
            className={isAllCompletedTodo ? "active" : ""}
          >
            {state.todos.length > 0 && (
              <BsChevronCompactDown onClick={handlers.toggleAllTodos} />
            )}
          </Styled.TodoCompleteToggleIcon>
          <Styled.TodoInput
            onInput={handlers.inputChange}
            onKeyDown={handlers.inputKeydown}
            value={state.todoText}
          />
        </Styled.TodoInputArea>
      </Styled.TodoHead>
      <Styled.TodoMain>
        <Styled.TodoList>
          {currentTodos.map((todo: Todo) => (
            <Styled.TodoItem key={todo.id}>
              <Styled.TodoItemCheckBox
                $edit={todo.edit} // 이거
                onClick={() => handlers.toggleTodoCompleted(todo)}
              >
                {todo.completed && <BsCheckLg />}
              </Styled.TodoItemCheckBox>
              {todo.edit ? (
                <Styled.TodoItemEditInput
                  value={todo.text}
                  ref={($element: HTMLInputElement) =>
                    (todoRefs.current[todo.id] = $element)
                  }
                  onBlur={() => handlers.todoEditBlur(todo)}
                  onInput={(event: React.FormEvent<HTMLInputElement>) =>
                    handlers.todoEditTextChange(event, todo)
                  }
                  onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
                    handlers.todoEditKeydown(event, todo)
                  }
                />
              ) : (
                <>
                  <Styled.TodoItemText
                    onDoubleClick={() => handlers.todoDoubleClick(todo)}
                  >
                    {todo.text}
                  </Styled.TodoItemText>
                  <Styled.TodoItemDeleteButton
                    onClick={() => handlers.deleteTodo(todo)}
                  >
                    <BsTrash3 />
                  </Styled.TodoItemDeleteButton>
                </>
              )}
            </Styled.TodoItem>
          ))}
        </Styled.TodoList>
        {state.todos.length > 0 && (
          <Styled.TodoFooter>
            <Styled.TodoCountText>
              {activeTodoCount} item{state.todos.length > 1 ? "s" : ""} left
            </Styled.TodoCountText>
            <Styled.TodoFilter>
              <Styled.TodoFilterOption
                onClick={() => handlers.changeFilter("ALL")}
                className={state.filter === "ALL" ? "active" : ""}
              >
                All
              </Styled.TodoFilterOption>
              <Styled.TodoFilterOption
                onClick={() => handlers.changeFilter("ACTIVE")}
                className={state.filter === "ACTIVE" ? "active" : ""}
              >
                Active
              </Styled.TodoFilterOption>
              <Styled.TodoFilterOption
                onClick={() => handlers.changeFilter("COMPLETE")}
                className={state.filter === "COMPLETE" ? "active" : ""}
              >
                Complete
              </Styled.TodoFilterOption>
            </Styled.TodoFilter>
            {isExistCompletedTodo && (
              <Styled.TodoClearCompleteButton
                onClick={handlers.clearCompletedTodos}
              >
                Clear Complete
              </Styled.TodoClearCompleteButton>
            )}
          </Styled.TodoFooter>
        )}
      </Styled.TodoMain>
    </Styled.Todos>
  );
}
