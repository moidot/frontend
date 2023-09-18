//스페이스 내보내기 API
import customedAxios from './customedAxios';

export const deleteGroupParticipateRemoval = async (token: string, participateId: number) => {
  try {
    const res = await customedAxios.delete('/group/participate/removal', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        participateId: participateId,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
