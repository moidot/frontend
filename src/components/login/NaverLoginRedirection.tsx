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
      const { email, name, token } = response.data;
      if (response.data) {
        api.setToken(token);
        api.setEmail(email);
        api.setName(name);
      }
      router.push('/');
    };
    if (codeParam != null) {
      fetchData();
    }
  }, [codeParam]);
  return <></>;
};

export default NaverLoginRedirect;
