import customedAxios from './customedAxios';

export const postBookmark = async (token: string, data: PostGroupReq): Promise<PostGroupRes> => {
  try {
    const res = await customedAxios.post(
      `/group`,
      {
        name: data.name,
        date: data.date,
        userName: data.userName,
        locationName: data.locationName,
        latitude: data.latitude,
        longitude: data.longitude,
        transportationType: data.transportationType,
        password: data.password,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
