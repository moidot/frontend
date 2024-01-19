import { Funnel } from '../funnel/Funnel';
import SpaceCreateMoveInfo from './spaceCreateMoveInfo/index';
import SpaceCreateName from './spaceCreateName/index';

const InviteSpaceCreate = () => {
  return (
    <div>
      <Funnel>
        <SpaceCreateName />
        <SpaceCreateMoveInfo />
      </Funnel>
    </div>
  );
};
export default InviteSpaceCreate;
