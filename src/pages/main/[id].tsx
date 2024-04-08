import DefaultLayout from '@/components/common/layout/defaultLayout';
import Main from '@/components/main';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const MainPage = (props: any) => {
  console.log(props, 'props');
  return (
    <>
      {props && (
        <DefaultLayout>
          <Head>
            <title>모이닷 | 장소 추천</title>
            <meta name="description" content="모임원의 위치를 기반으로 중간 장소 3곳과 상세 장소를 추천" />
          </Head>
          <Main id={props.id} />
        </DefaultLayout>
      )}
    </>
  );
};

export default MainPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  return {
    props: {
      id,
    },
  };
};
