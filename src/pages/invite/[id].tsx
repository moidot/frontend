import SpaceInvite from '@/components/invite/SpaceInvite';
import { useRouter } from 'next/router';

const InvitePage = () => {
  const router = useRouter();
  return router?.query.id !== undefined && <SpaceInvite router={router} />;
};

export default InvitePage;
