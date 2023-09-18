//스페이스 나가기 API
import customedAxios from './customedAxios';

export const deleteGroupParticipate = async (token: string, participateId: number) => {
  try {
    const res = await customedAxios.delete('/group/participate', {
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
