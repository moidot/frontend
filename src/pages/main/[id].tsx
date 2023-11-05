import DefaultLayout from '@/components/common/layout/defaultLayout';
import Main from '@/components/main';
import { GetServerSideProps } from 'next';

const MainPage = (props: any) => {
  console.log(props);
  return (
    <>
      <DefaultLayout>
        <Main id={props.id} />
      </DefaultLayout>
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
