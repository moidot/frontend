//로그아웃
import customedAxios from './customedAxios';

export const deleteAuthLogout = async (token: string) => {
  try {
    const res = await customedAxios.delete('/auth/logout', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
