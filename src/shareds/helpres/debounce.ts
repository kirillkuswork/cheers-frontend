/* eslint-disable @typescript-eslint/no-explicit-any */
function debounce<T extends any[]>(func: (...args: T) => void, delay: number): (...args: T)
=> void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  // eslint-disable-next-line func-names
  return function (...args: T): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
export default debounce;
