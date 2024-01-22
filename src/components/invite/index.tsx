import { useEffect, useState } from 'react';
import { Funnel } from '../funnel/Funnel';
import SpaceCreateMoveInfo from './spaceCreateMoveInfo/index';
import SpaceCreateName from './spaceCreateName/index';
import api from '@/services/TokenService';
import { useGetGroup } from '@/hooks/useGetGroup';

const InviteSpaceCreate = () => {
  const token = api.getToken();
  const [groupId, setGroupId] = useState<any>();
  const response = useGetGroup(token, groupId);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('groupId') !== null) {
        setGroupId(sessionStorage.getItem('groupId'));
        response.data?.data.name !== undefined && sessionStorage.setItem('groupName', response.data?.data.name);
        response.data?.data.date !== undefined && sessionStorage.setItem('date', response.data?.data.date);
      }
    }
  }, [groupId]);

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
