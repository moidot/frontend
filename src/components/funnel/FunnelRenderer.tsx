import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useFunnelContext } from './FunnelContentProvider';

export const FunnelRenderer = () => {
  const { current } = useFunnelContext();

  const router = useRouter();

  useEffect(() => {
    if (!current) return;
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          screen: Object(current).type.name,
        },
      },
      undefined,
      { shallow: true },
    );
  }, []);

  return current as JSX.Element;
};
