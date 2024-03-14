import { useEffect, useState } from 'react';
import { Funnel } from '../funnel/Funnel';
import SpaceCreateMoveInfo from './spaceCreateMoveInfo/index';
import SpaceCreateName from './spaceCreateName/index';
import { useGetGroup } from '@/hooks/useGetGroup';

const InviteSpaceCreate = () => {
  // const token = api.getToken();
  const [groupId, setGroupId] = useState<any>();
  const response = useGetGroup(groupId);
  const gId = typeof window !== 'undefined' ? sessionStorage.getItem('groupId') : null;

  useEffect(() => {
    if (gId !== null) {
      setGroupId(gId);
      response.data?.data.name !== undefined &&
        (sessionStorage.setItem('groupName', response.data?.data.name),
        sessionStorage.setItem('date', response.data?.data.date));
    }
  }, [gId, response.data?.data.date, response.data?.data.name]);

  return (
    <div>
      <Funnel>
        <SpaceCreateName />
        <SpaceCreateMoveInfo />
      </Funnel>
    </div>
  );
};
export default InviteSpaceCreate;
