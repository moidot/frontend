import React, { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import api from '@/services/TokenService';
import { useRouter } from 'next/router';
import getAuthLogin from '@/apis/getAuthLogin';

const GoogleLoginRedirect = () => {
  const router = useRouter();
  const params = useSearchParams();
  const codeParam: string = params.get('code') as string;
  const groupId = typeof window !== 'undefined' ? sessionStorage.getItem('groupId') : null;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAuthLogin(codeParam, 'GOOGLE');
      console.log(response);

      const { userId, email, name, accessToken } = response.data;

      console.log(response.data);
      if (response.message == '성공') {
        api.setId(userId.toString());
        api.setToken(accessToken);
        api.setEmail(email);
        api.setName(name);
        console.log(api.getToken());
      }

      groupId !== null ? router.push('/inviteCreate') : router.push('/user');
    };
    if (codeParam != null) {
      fetchData();
    }
  }, [codeParam]);
  return <></>;
};

export default GoogleLoginRedirect;
