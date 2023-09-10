import React, { useEffect } from 'react';
import { UserInfoAtomProps, userInfoAtom } from '@/states/userInfoAtom';
import { useSearchParams } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import api from '@/services/TokenService';
import { useRouter } from 'next/router';
import getAuthLogin from '@/apis/getAuthLogin';

const NaverLoginRedirect = () => {
  const router = useRouter();
  const params = useSearchParams();
  const codeParam: string = params.get('code') as string;
  const setUserInfo = useSetRecoilState(userInfoAtom);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAuthLogin(codeParam, 'NAVER');
      console.log(response);
      const { email, name, token } = response.data;
      const userInfo: UserInfoAtomProps = {
        name: name,
        email: email,
      };
      console.log(userInfo);
      setUserInfo(userInfo);
      if (token) {
        api.setToken(token);
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
