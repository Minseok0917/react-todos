import React from "react";

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

  /*
    handler list
    - head input(
        input : setInput
        keydown : input.length & todos push
      )
    - head all checked(
        toggle click 
    )
    - body list checkbox(
        toggle clike
    )
    - body list text( = currentFilterTodos
      dbclick : edit on & focus
      focusout : edit off & exception 
      input : editText
      keydown : edit success 
    )
    - body list button (
      click : delete
    )
    - footer text (
      text : n > 1 ? items : item
    )
    - footer filter (
      click : filterChange
    )
    - footer clearComplete (
      click : completeAll Remove 
    )
  */

  return <div></div>;
}
