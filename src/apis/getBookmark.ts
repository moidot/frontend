import customedAxios from './customedAxios';

export const getBookmark = async (token: string): Promise<GetAllParticipationRes> => {
  try {
    const res = await customedAxios.get('/bookmark', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
