import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/services/TokenService';
import { useRouter } from 'next/router';
import getAuthLogin from '@/apis/getAuthLogin';

const KakaoLoginRedirect = () => {
  const router = useRouter();
  const params = useSearchParams();
  const codeParam: string = params.get('code') as string;
  const groupId = typeof window !== 'undefined' ? sessionStorage.getItem('groupId') : null;
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAuthLogin(codeParam, 'KAKAO');
      console.log(response);
      const { userId, email, name, accessToken } = response.data;
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

export default KakaoLoginRedirect;
