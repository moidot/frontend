import { deleteGroupParticipateRemoval } from '@/apis/deleteGroupParticipateRemoval';
import { useMutation } from '@tanstack/react-query';

export const useDeleteGroupParticipateRemoval = (token: string, participateId: number) => {
  return useMutation(() => deleteGroupParticipateRemoval(token, participateId), {
    onSuccess: () => {
      alert('내보내기 성공');
    },
    onError: () => {
      console.log('내보내기 error');
    },
  });
};
