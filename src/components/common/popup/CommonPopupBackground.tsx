import { ReactNode } from 'react';

type MyComponentProps = {
  children: ReactNode;
};

const CommonPopupBackground = ({ children }: MyComponentProps) => {
  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-10" style={{ backgroundColor: 'rgba( 0, 0, 0, 0.6 )' }}>
      <div className="font-Pretendard">{children}</div>
    </div>
  );
};

export default CommonPopupBackground;
