import { useRouter } from 'next/router';
import BackBtn from '@assets/participate/btn_back.svg';

// 뒤로가기 버튼만 있는 네비게이션 바
const SimpleNav = () => {
  const router = useRouter();
  return (
    <div className="w-full h-[80px] border border-[#E2E2E2]">
      <div className="flex w-[1200px] h-full items-center mx-auto">
        <BackBtn onClick={() => router.push('/participant')} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default SimpleNav;
