import DefaultLayout from '@/components/common/layout/defaultLayout';
import Main from '@/components/main';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

const MainPage = (props: any) => {
  const [id, setId] = useState<any>('');
  useEffect(() => {
    props && setId(props.id);
  }, []);

  console.log(props, 'props');
  return (
    <>
      {props && (
        <DefaultLayout>
          <Main id={id} />
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
