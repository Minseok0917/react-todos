export function useDebounce(callback: () => void, delay: number = 300) {
  let timeout = useRef<NodeJS.Timeout | null>(null);
  return (): void => {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(callback, delay);
  };
}
