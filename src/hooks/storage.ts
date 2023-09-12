import { Dispatch, SetStateAction } from "react";
import { useDebounce } from "./helpers";

interface storageOptions {
  debounce?: boolean;
  debounceDelay?: number;
}

export function useLocalStorage<T>(
  key: string,
  initalState: T,
  options: storageOptions = {}
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(() => {
    try {
      const storage = localStorage.getItem(key);
      return storage ? JSON.parse(storage) : initalState;
    } catch (error) {
      return initalState;
    }
  });
  const { debounce, debounceDelay } = options;
  const setStorage = () => localStorage.setItem(key, JSON.stringify(state));
  const debounceFunction = debounce
    ? useDebounce(setStorage, debounceDelay)
    : setStorage;

  useEffect(debounceFunction, [state, key]);
  return [state, setState];
}
