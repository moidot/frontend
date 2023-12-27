import { FunnelContetProvider } from './FunnelContentProvider';
import { FunnelContextSetter } from './FunnelContextSetter';
import { FunnelRenderer } from './FunnelRenderer';

export const Funnel = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <FunnelContetProvider>
      <FunnelContextSetter>{children}</FunnelContextSetter>
      <FunnelRenderer />
    </FunnelContetProvider>
  );
};
