import { Dispatch, SetStateAction } from "react";

export function useIdGenerator(key: string) {
  let id: number = JSON.parse(localStorage.getItem(key) ?? "0");
  const getId = () => (localStorage.setItem(key, (++id).toString()), id);
  return { id, getId };
}
export function useLocalStorage<T>(key: string, initialState: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(() => {
    try {
      const state = localStorage.getItem(key);
      return state ? (JSON.parse(state) as T) : initialState;
    } catch (error) {
      return initialState;
    }
  });
  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [key, state]);
  return [state, setState];
}

export function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number = 300) {
  let timeout = useRef<NodeJS.Timeout | null>(null);
  return (...args: Parameters<T>): void => {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => callback(args), delay);
  };
}

type Filter = "all" | "active" | "completed";

interface Todo {
  id: number;
  text: string;
  edit: boolean;
  completed: boolean;
}

interface State {
  todos: Todo[];
  todoText: string;
  todoFilter: Filter;
}

export default function TodoContainer() {
  const idGenerator = useIdGenerator("todoId");
  const [state, setState] = useLocalStorage<State>("todos", {
    todos: [],
    todoText: "",
    todoFilter: "all",
  });

  const handleUpdateTodoText = useDebounce((text: string) => {
    setState({ ...state, todoText: text });
  }, 300);
}
