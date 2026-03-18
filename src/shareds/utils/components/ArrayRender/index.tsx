import { ReactNode } from 'react';

interface IList<T> {
  items: T[] | undefined;
  renderItem: (item: T, index: number) => ReactNode;
}

/**
 *
 *  <Index items={items} renderItem={(QueueItem)=><itemTemplate key/>}/>
 *
 * */
function ArrayRender<T>({ items, renderItem }: IList<T>) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{items?.map(renderItem)}</>;
}

export default ArrayRender;
