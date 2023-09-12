import * as Styled from "@components/todos/styled";

export interface TodoInput {
  focus: boolean;
  value: string;
  onBlur: () => void;
  onInput: (event: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
