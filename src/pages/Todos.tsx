import React from "react";
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

  const handlers = {
    inputChange(event: React.FormEvent<HTMLInputElement>) {},
    inputKeydown(event: React.KeyboardEvent<HTMLInputElement>) {},
    toggleAllTodos(event: React.MouseEvent<HTMLDivElement>) {},
    toggleTodoCompleted(event: React.MouseEvent) {},
    todoDoubleClick(event: React.MouseEvent) {},
    todoEditFocusOut(event: React.FocusEvent) {},
    todoEditTextChange(event: React.FormEvent) {},
    todoEditKeydown(event: React.KeyboardEvent) {},
    deleteTodo(event: React.KeyboardEvent) {},
    changeFilter(event: React.KeyboardEvent) {},
    clearCompletedTodos(event: React.KeyboardEvent) {},
  };

  return (
    <Styled.Todos>
      <Styled.TodoHead>
        <Styled.TodoTitle>TODOS</Styled.TodoTitle>
        <Styled.TodoInput />
      </Styled.TodoHead>
      <Styled.TodoMain>
        <Styled.TodoList>
          <Styled.TodoItem>
            <Styled.TodoItemCheckBox />
            <Styled.TodoItemText>흑</Styled.TodoItemText>
            <Styled.TodoItemEditInput />
            <Styled.TodoItemDeleteButton>삭제</Styled.TodoItemDeleteButton>
          </Styled.TodoItem>
        </Styled.TodoList>
      </Styled.TodoMain>
      <Styled.TodoFooter>
        <Styled.TodoCountText>2 items left</Styled.TodoCountText>
        <Styled.TodoFilter>
          <Styled.TodoFilterOption>ALL</Styled.TodoFilterOption>
        </Styled.TodoFilter>
        <Styled.TodoClearCompleteButton>
          Clear Complete
        </Styled.TodoClearCompleteButton>
      </Styled.TodoFooter>
    </Styled.Todos>
  );
}
