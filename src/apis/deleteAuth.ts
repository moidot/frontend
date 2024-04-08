//회원 탈퇴 API
import customedAxios from './customedAxios';

export const deleteAuth = async (token: string) => {
  try {
    const res = await customedAxios.delete('/auth', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
