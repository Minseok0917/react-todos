import { Dispatch, SetStateAction } from "react";

export function useLocalStorage<T>(
  key: string,
  initalState: T
): [T, Dispatch<SetStateAction<T>>] {
  // 기존의 storage 에 동일한 key 로 값이 있을 경우 타입대로 안될 수도 있음
  const [storage, setStorage] = useState(() => {
    try {
      const storage = localStorage.getItem(key);
      return storage ? JSON.parse(storage) : initalState;
    } catch (error) {
      return initalState;
    }
  });
  useEffect(
    () => localStorage.setItem(key, JSON.stringify(storage)),
    [storage, key]
  );
  return [storage, setStorage];
}
