/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useEffect, useState } from 'react';

export const useIsElementVisible = (
  element: MutableRefObject<Element | null | undefined>,
  rootMargin = 0,
): boolean => {
  const [isVisible, setState] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin: `${rootMargin}px` },
    );

    const currentElement = element.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [element, rootMargin]); // Обновлено: теперь зависимость — элемент и rootMargin

  return isVisible;
};
