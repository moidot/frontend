'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import TeamExitPopup from './teamExitPopup';
import { deleteParticipant } from '@/apis/participant';

interface popupProps {
  role: string;
  title: string;
  desc: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFunction: any;
}

const Popup = ({ role, title, desc, setFunction }: popupProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { mutate } = useMutation((participantId: number) => deleteParticipant(participantId), {
    onSuccess: () => {
      // mutate가 정상적으로 실행되면, 함수를 실행합니다.
      console.log('모임을 나갔습니다');
    },
    onError: () => {
      // mutate가 실패하면, 함수를 실행합니다.
      console.log('스페이스 나가기 error');
    },
  });
  const clickDelete = () => {
    //모임원 나가기
    role === 'member' && mutate(2);
    setIsChecked(true);
  };

  const clickCancel = () => {
    setFunction(false);
  };

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh]" style={{ backgroundColor: 'rgba( 0, 0, 0, 0.6 )' }}>
      <div className="font-Pretendard">
        {isChecked ? (
          <TeamExitPopup setIsChecked={setIsChecked} setFunction={setFunction} />
        ) : (
          <div className="w-[790px] h-[367px] border mt-[25vh] mx-auto p-8 text-center rounded-2xl bg-white">
            <div className="pb-8 text-h3 text-font_black font-bold">{title}</div>
            <div className="text-b2 text-font_gray whitespace-pre">{desc}</div>
            <div className="flex w-[600px] mt-[85px] justify-between mx-auto">
              {role === 'member' ? (
                <button
                  type="button"
                  className="w-[277px] h-[78px] rounded-2xl border-2 border-main_orange text-main_orange text-b2 flex items-center justify-center"
                  onClick={clickDelete}>
                  <span>모이닷 스페이스 나가기</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="w-[277px] h-[78px] rounded-2xl border-2 border-main_orange text-main_orange text-b2 flex items-center justify-center"
                  onClick={() => alert('삭제가 완료되었습니다.')}>
                  <span>삭제하기</span>
                </button>
              )}
              <button
                type="button"
                className="w-[277px] h-[78px] rounded-2xl bg-main_orange text-white text-b2 font-bold flex items-center justify-center"
                onClick={clickCancel}>
                취소하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
