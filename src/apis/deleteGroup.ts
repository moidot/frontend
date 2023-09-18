//스페이스 삭제 API
import customedAxios from './customedAxios';

export const deleteGroup = async (token: string, groupId: number) => {
  try {
    const res = await customedAxios.delete('/group', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        groupId: groupId,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
