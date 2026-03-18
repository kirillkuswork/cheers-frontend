import {
  createRef, RefObject, useEffect, useState,
} from 'react';

export const useChaptersScroll = (links: string[]) => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [refs, setRefs] = useState<Array<RefObject<HTMLDivElement>>>([]);
  const [mainRef, setMainRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mainRef) {
      return;
    }

    setRefs(links.map(() => createRef<HTMLParagraphElement>()));
  }, [links, mainRef]);

  const addObserver = (ref: RefObject<HTMLParagraphElement>, index: number) => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActiveChapter(index);
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  };

  useEffect(() => {
    if (refs.length !== links.length) {
      return;
    }

    const disconnectors: Array<() => void> = refs.map((ref, index) => addObserver(ref, index)).filter(Boolean) as Array<() => void>;

    return () => {
      disconnectors.forEach((disconnect) => disconnect());
    };
  }, [links.length, refs]);

  return { activeChapter, setMainRef, refs };
};
