import React, { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import api from '@/services/TokenService';
import { useRouter } from 'next/router';
import getAuthLogin from '@/apis/getAuthLogin';

const GoogleLoginRedirect = () => {
  const router = useRouter();
  const params = useSearchParams();
  const codeParam: string = params.get('code') as string;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAuthLogin(codeParam, 'GOOGLE');

      const { email, name, accessToken } = response.data;

      console.log(response.data);
      if (response.message == '성공') {
        api.setToken(accessToken);
        api.setEmail(email);
        api.setName(name);
        console.log(api.getToken());
      }

      router.push('/login');
    };
    if (codeParam != null) {
      fetchData();
    }
  }, [codeParam]);
  return <></>;
};

export default GoogleLoginRedirect;
