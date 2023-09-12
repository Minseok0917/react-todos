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
  handleCreateInputChange: (event: React.FormEvent<HTMLInputElement>) => void;
  handleCreateInputKeydown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleToggleAllClick: () => void;
  handleCheckBoxClick: (todo: Todo) => void;
  handleTextDoubleClick: (todo: Todo) => void;
  handleEditInputBlur: (todo: Todo) => void;
  handleEditInputChange: (event: React.FormEvent<HTMLInputElement>, todo: Todo) => void;
  handleEditInputKeydown: (event: React.KeyboardEvent<HTMLInputElement>, editTodo: Todo) => void;
  handleDeleteClick: (deleteTodo: Todo) => void;
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
  handleCreateInputChange,
  handleCreateInputKeydown,
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
            onInput={handleCreateInputChange}
            onKeyDown={handleCreateInputKeydown}
            value={String(state.todoText)}
          />
        </Styled.TodoInputArea>
      </Styled.TodoHead>
      <Styled.TodoMain>
        <Styled.TodoList>
          {currentTodos.map((todo: Todo) => (
            <Styled.TodoItem key={todo.id}>
              <Styled.TodoItemCheckBox $edit={todo.edit} onClick={() => handleCheckBoxClick(todo)}>
                {todo.completed && <BsCheckLg />}
              </Styled.TodoItemCheckBox>
              {todo.edit ? (
                <TodoInput
                  value={todo.text}
                  focus={todo.edit}
                  onBlur={() => handleEditInputBlur(todo)}
                  onInput={(event: React.FormEvent<HTMLInputElement>) => handleEditInputChange(event, todo)}
                  onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleEditInputKeydown(event, todo)}
                />
              ) : (
                <>
                  <Styled.TodoItemText onDoubleClick={() => handleTextDoubleClick(todo)}>
                    {todo.text}
                  </Styled.TodoItemText>
                  <Styled.TodoItemDeleteButton onClick={() => handleDeleteClick(todo)}>
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
                  onClick={() => handleFilterChange(filter)}
                  className={state.filter === filter ? "active" : ""}
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
