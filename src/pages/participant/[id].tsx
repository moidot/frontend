import Participate from '@/components/participate/Participant';
import { GetServerSideProps } from 'next';

const ParticipatePage = (props: any) => {
  return props && <Participate id={props.id} />;
};
export default ParticipatePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  return {
    props: {
      id,
    },
  };
};
