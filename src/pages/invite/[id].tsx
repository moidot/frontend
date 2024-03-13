import SpaceInvite from '@/components/invite/InviteSpaceInvite';
// import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

const InvitePage = (props: any) => {
  // const router = useRouter();
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
