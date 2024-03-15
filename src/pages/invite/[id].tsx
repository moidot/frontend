import SpaceInvite from '@/components/invite/InviteSpaceInvite';
import { GetServerSideProps } from 'next';

const InvitePage = (props: any) => {
  return props && <SpaceInvite id={props.id} />;
};

export default InvitePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  return {
    props: {
      id,
    },
  };
};
