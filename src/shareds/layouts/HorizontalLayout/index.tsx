/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
// import debounce from '@/helpres/debounce';
// import { Slider } from '@/shareds';

interface IProps {
  isVisible?: boolean;
}

interface IPropsHorizontalScrollLayout {
  listPages: React.FC<IProps>[];
}

function HorizontalScrollLayout({ listPages }: IPropsHorizontalScrollLayout) {
  // const [currentPage, setCurrentPage] = useState(0);
  // const silder = useRef(null);
  // useEffect(() => {
  //   const slider = document.getElementById('slider');
  //   const handleScroll = debounce((event) => {
  //     if (event.deltaY > 0) (silder?.current as any)?.goToNext?.();
  //     if (event.deltaY < 0) (silder?.current as any)?.goToPrev?.();
  //   }, 1500);
  //   slider?.addEventListener('wheel', handleScroll);

  //   return () => {
  //     slider?.removeEventListener('wheel', handleScroll);
  //   };
  // }, []);
  const getIdsListPages = useMemo(() => listPages.map((Page, index) => ({ Page, key: `page_in_slider_${index}` })), [listPages]);
  return (
    <div id="slider">
      {
        getIdsListPages.map(({ Page, key }) => (
          <Page key={key} isVisible />
        ))
      }
    </div>
  );
}

export default HorizontalScrollLayout;
