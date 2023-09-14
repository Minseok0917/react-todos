import { BsTrash3, BsChevronCompactDown, BsCheckLg } from "react-icons/bs";
import * as Styled from "@components/todos/styled";
import { Filter, Todo, State } from "./todos.interface";

interface TodoInput {
  focus: boolean;
  value: string;
  onBlur: () => void;
  onInput: (event: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
interface TodoPresenter {
  state: State;
  filters: Filter[];
  currentTodos: Todo[];
  activeTodoCount: number;
  isAllCompletedTodo: Boolean;
  isExistCompletedTodo: Boolean;
  handleTodoTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTodoTextKeydown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleToggleAllClick: () => void;
  handleCheckBoxClick: (id: number) => void;
  handleTextDoubleClick: (id: number) => void;
  handleEditInputBlur: (id: number) => void;
  handleEditInputChange: (event: React.FormEvent<HTMLInputElement>, id: number) => void;
  handleEditInputKeydown: (event: React.KeyboardEvent<HTMLInputElement>, id: number) => void;
  handleDeleteClick: (id: number) => void;
  handleFilterChange: (filterName: Filter) => void;
  handleClearCompleteClick: () => void;
}

export function TodoInput({ value, focus, onBlur, onInput, onKeyDown }: TodoInput) {
  const todoRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focus && todoRef.current) {
      todoRef.current.focus();
    }
  }, [focus]);

  return (
    <Styled.TodoItemEditInput ref={todoRef} value={value} onBlur={onBlur} onInput={onInput} onKeyDown={onKeyDown} />
  );
}

export function TodoPresenter({
  state,
  filters,
  currentTodos,
  activeTodoCount,
  isAllCompletedTodo,
  isExistCompletedTodo,
  handleTodoTextChange,
  handleTodoTextKeydown,
  handleToggleAllClick,
  handleCheckBoxClick,
  handleTextDoubleClick,
  handleEditInputBlur,
  handleEditInputChange,
  handleEditInputKeydown,
  handleDeleteClick,
  handleFilterChange,
  handleClearCompleteClick,
}: TodoPresenter) {
  return (
    <Styled.Todos>
      <Styled.TodoHead>
        <Styled.TodoTitle>TODOS</Styled.TodoTitle>
        <Styled.TodoInputArea>
          <Styled.TodoCompleteToggleIcon className={isAllCompletedTodo ? "active" : ""}>
            {state.todos.length > 0 && <BsChevronCompactDown onClick={handleToggleAllClick} />}
          </Styled.TodoCompleteToggleIcon>
          <Styled.TodoInput
            onInput={handleTodoTextChange}
            onKeyDown={handleTodoTextKeydown}
            value={String(state.todoText)}
          />
        </Styled.TodoInputArea>
      </Styled.TodoHead>
      <Styled.TodoMain>
        <Styled.TodoList>
          {currentTodos.map((todo: Todo) => (
            <Styled.TodoItem key={todo.id}>
              <Styled.TodoItemCheckBox $edit={todo.edit} onClick={() => handleCheckBoxClick(todo.id)}>
                {todo.completed && <BsCheckLg />}
              </Styled.TodoItemCheckBox>
              {todo.edit ? (
                <TodoInput
                  value={todo.text}
                  focus={todo.edit}
                  onBlur={() => handleEditInputBlur(todo.id)}
                  onInput={(event: React.FormEvent<HTMLInputElement>) => handleEditInputChange(event, todo.id)}
                  onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleEditInputKeydown(event, todo.id)}
                />
              ) : (
                <>
                  <Styled.TodoItemText onDoubleClick={() => handleTextDoubleClick(todo.id)}>
                    {todo.text}
                  </Styled.TodoItemText>
                  <Styled.TodoItemDeleteButton onClick={() => handleDeleteClick(todo.id)}>
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
              {filters.map((filter) => (
                <Styled.TodoFilterOption
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={state.todoFilter === filter ? "active" : ""}
                >
                  {filter.toLowerCase()}
                </Styled.TodoFilterOption>
              ))}
            </Styled.TodoFilter>
            {isExistCompletedTodo && (
              <Styled.TodoClearCompleteButton onClick={handleClearCompleteClick}>
                Clear Complete
              </Styled.TodoClearCompleteButton>
            )}
          </Styled.TodoFooter>
        )}
      </Styled.TodoMain>
    </Styled.Todos>
  );
}
