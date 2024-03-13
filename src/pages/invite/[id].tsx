import SpaceInvite from '@/components/invite/InviteSpaceInvite';
import { useRouter } from 'next/router';
// import { GetServerSideProps } from 'next';

const InvitePage = () => {
  const router = useRouter();
  return router.query.id && <SpaceInvite router={router} />;
};

export default InvitePage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const id = context.params?.id;
//   return {
//     props: {
//       id,
//     },
//   };
// };
