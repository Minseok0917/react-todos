import React from "react";
import { BsTrash3, BsChevronCompactDown, BsCheckLg } from "react-icons/bs";
import * as Styled from "@components/todos/styled";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  edit: boolean;
}
type Filter = "ALL" | "ACTIVE" | "COMPLETE";

export default function Todos() {
  const storedTodos = localStorage.getItem("todos");
  const storedNextId = localStorage.getItem("nextId");
  const storedTodoText = localStorage.getItem("todoText");
  const storedFilter = localStorage.getItem("filter");

  const [todos, setTodos] = useState<Todo[]>(
    storedTodos ? JSON.parse(storedTodos) : []
  );
  const [filter, setFilter] = useState<Filter>(
    (storedFilter as Filter) ?? "ALL"
  );
  const [nextId, setNextId] = useState<number>(
    storedNextId ? +storedNextId : 0
  );
  const [inputText, setInputText] = useState<string>(storedTodoText ?? "");

  const todoRefs = useRef<{ [key: number]: HTMLInputElement }>({});

  const isAllCompletedTodo: Boolean = useMemo(
    () => todos.every(({ completed }: Todo) => completed),
    [todos]
  );
  const isExistCompletedTodo: Boolean = useMemo(
    () => todos.some(({ completed }: Todo) => completed),
    [todos]
  );

  const activeTodoCount: number = useMemo(
    () => todos.filter(({ completed }: Todo) => !completed).length,
    [todos]
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("nextId", `${nextId}`);
    localStorage.setItem("todoText", inputText);
    localStorage.setItem("filter", filter);
  }, [todos, inputText, nextId, filter]);

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
          edit: false,
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
    todoDoubleClick(todo: Todo) {
      todo.edit = true;
      setTodos([...todos]);
      setTimeout(() => todoRefs.current[todo.id].focus(), 0);
    },
    todoEditBlur(todo: Todo) {
      todo.edit = false;
      setTodos([...todos]);
    },
    todoEditTextChange(event: React.FormEvent<HTMLInputElement>, todo: Todo) {
      todo.text = event.currentTarget.value;
      setTodos([...todos]);
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
          setTodos([...todos]);
        } else {
          const notEditTodos: Todo[] = todos.filter(
            (todo) => todo !== editTodo
          );
          setTodos(notEditTodos);
        }
      }
    },
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
        {todos.length > 0 && (
          <Styled.TodoFooter>
            <Styled.TodoCountText>
              {activeTodoCount} item{todos.length > 1 ? "s" : ""} left
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
