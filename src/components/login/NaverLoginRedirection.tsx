import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/services/TokenService';
import { useRouter } from 'next/router';
import getAuthLogin from '@/apis/getAuthLogin';

const NaverLoginRedirect = () => {
  const router = useRouter();
  const params = useSearchParams();
  const codeParam: string = params.get('code') as string;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAuthLogin(codeParam, 'NAVER');
      console.log(response);
      const { userId, email, name, accessToken } = response.data;
      const groupId = typeof window !== 'undefined' ? sessionStorage.getItem('groupId') : null;

      if (response.data) {
        api.setId(userId.toString());
        api.setToken(accessToken);
        api.setEmail(email);
        api.setName(name);
      }
      groupId !== null ? router.push('/inviteCreate') : router.push('/user');
    };
    if (codeParam != null) {
      fetchData();
    }
  }, [codeParam]);
  return <></>;
};

export default NaverLoginRedirect;
