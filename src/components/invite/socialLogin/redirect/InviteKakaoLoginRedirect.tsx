import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/services/TokenService';
import { useRouter } from 'next/router';
import getAuthLogin from '@/apis/getAuthLogin';

const InviteKakaoLoginRedirect = () => {
  const router = useRouter();
  const params = useSearchParams();
  const codeParam: string = params.get('code') as string;
  useEffect(() => {
    console.log('codeParam...', codeParam);
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
      router.push('/inviteCreate');
    };
    if (codeParam != null) {
      fetchData();
    }
  }, [codeParam]);
  return <></>;
};

export default InviteKakaoLoginRedirect;
