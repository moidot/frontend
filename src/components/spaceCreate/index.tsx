import { Funnel } from '../funnel/Funnel';
import SpaceCreateInfo from './spaceCreateInfo';
import SpaceCreateMoveInfo from './spaceCreateMoveInfo';
import SpaceCreateName from './spaceCreateName/index';

const SpaceCreate = () => {
  return (
    <div>
      <Funnel>
        <SpaceCreateInfo />
        <SpaceCreateName />
        <SpaceCreateMoveInfo />
      </Funnel>
    </div>
  );
};
export default SpaceCreate;
