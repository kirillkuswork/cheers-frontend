import { useEffect, useCallback, RefObject } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent) => void,
  active: boolean = true,
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    },
    [ref, handler],
  );

  useEffect(() => {
    if (active) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [active, handleClickOutside]);
};
