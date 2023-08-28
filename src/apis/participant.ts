import customedAxios from './customedAxios';

export const getAllParticipantList = async (groupId: string) => {
  const { data } = await customedAxios.get('/group', { params: { groupId: groupId } });
  return data;
};
