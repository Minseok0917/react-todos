import React from "react";
import { BsTrash3, BsChevronCompactDown, BsCheckLg } from "react-icons/bs";
import * as Styled from "@components/todos/styled";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
type Filter = "ALL" | "ACTIVE" | "COMPLETE";

export default function Todos() {
  const [inputText, setInputText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [nextId, setNextId] = useState<number>(0);

  const isAllCompletedTodo = useMemo(
    () => todos.every(({ completed }: Todo) => completed),
    [todos]
  );
  const isExistCompletedTodo = useMemo(
    () => todos.some(({ completed }: Todo) => completed),
    [todos]
  );

  const filterServices = {
    ALL: () => todos,
    ACTIVE: () => todos.filter(({ completed }: Todo) => !completed),
    COMPLETE: () => todos.filter(({ completed }: Todo) => completed),
  };
  const currentTodos = useMemo(() => filterServices[filter](), [todos, filter]);

  const handlers = {
    inputChange(event: React.FormEvent<HTMLInputElement>) {
      setInputText(event.currentTarget.value);
    },
    inputKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
      const inputValue = event.currentTarget.value.trim();
      const isCreated: Boolean = ["Tab", "Enter"].includes(event.key);
      const isValid: Boolean = inputValue.length > 0;
      if (isCreated && isValid) {
        const todo: Todo = {
          id: nextId,
          text: inputValue,
          completed: false,
        };
        setInputText("");
        setNextId(nextId + 1);
        setTodos([...todos, todo]);
      }
    },
    toggleAllTodos() {
      const toggleTodos: Todo[] = todos.map((todo: Todo) => ({
        ...todo,
        completed: !isAllCompletedTodo,
      }));
      setTodos([...toggleTodos]);
    },
    toggleTodoCompleted(todo: Todo) {
      todo.completed = !todo.completed;
      setTodos([...todos]);
    },
    // todoDoubleClick(todo: Todo) {},
    // todoEditFocusOut(event: React.FocusEvent) {},
    // todoEditTextChange(event: React.FormEvent) {},
    // todoEditKeydown(event: React.KeyboardEvent) {},
    deleteTodo(deleteTodo: Todo) {
      const removeTodos: Todo[] = todos.filter(
        (todo: Todo) => todo !== deleteTodo
      );
      setTodos([...removeTodos]);
    },
    changeFilter(filterName: Filter) {
      setFilter(filterName);
    },
    clearCompletedTodos() {
      const notCompleteTodos: Todo[] = todos.filter(
        ({ completed }: Todo) => !completed
      );
      setTodos([...notCompleteTodos]);
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
            {todos.length > 0 && (
              <BsChevronCompactDown onClick={handlers.toggleAllTodos} />
            )}
          </Styled.TodoCompleteToggleIcon>
          <Styled.TodoInput
            onInput={handlers.inputChange}
            onKeyDown={handlers.inputKeydown}
            value={inputText}
          />
        </Styled.TodoInputArea>
      </Styled.TodoHead>
      <Styled.TodoMain>
        <Styled.TodoList>
          {currentTodos.map((todo: Todo) => (
            <Styled.TodoItem key={todo.id}>
              <Styled.TodoItemCheckBox
                onClick={() => handlers.toggleTodoCompleted(todo)}
              >
                {todo.completed && <BsCheckLg />}
              </Styled.TodoItemCheckBox>
              <Styled.TodoItemText>{todo.text}</Styled.TodoItemText>
              {/* <Styled.TodoItemEditInput /> */}
              <Styled.TodoItemDeleteButton
                onClick={() => handlers.deleteTodo(todo)}
              >
                <BsTrash3 />
              </Styled.TodoItemDeleteButton>
            </Styled.TodoItem>
          ))}
        </Styled.TodoList>
        {todos.length > 0 && (
          <Styled.TodoFooter>
            <Styled.TodoCountText>
              {todos.length} item{todos.length > 1 ? "s" : ""} left
            </Styled.TodoCountText>
            <Styled.TodoFilter>
              <Styled.TodoFilterOption
                onClick={() => handlers.changeFilter("ALL")}
                className={filter === "ALL" ? "active" : ""}
              >
                All
              </Styled.TodoFilterOption>
              <Styled.TodoFilterOption
                onClick={() => handlers.changeFilter("ACTIVE")}
                className={filter === "ACTIVE" ? "active" : ""}
              >
                Active
              </Styled.TodoFilterOption>
              <Styled.TodoFilterOption
                onClick={() => handlers.changeFilter("COMPLETE")}
                className={filter === "COMPLETE" ? "active" : ""}
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
