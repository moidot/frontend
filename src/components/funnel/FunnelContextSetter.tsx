import { useEffect } from 'react';
import { useFunnelContext } from './FunnelContentProvider';

export const FunnelContextSetter = ({ children }: { children: React.ReactNode[] }) => {
  const { setChildren, setCurrent } = useFunnelContext();

  useEffect(() => {
    setChildren(children);
    setCurrent(children[0]);
  }, [children, setChildren, setCurrent]);

  return null;
};
