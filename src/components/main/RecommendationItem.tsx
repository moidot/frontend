import AdminBox from '../common/main/AdminBox';
import OthersBox from '../common/main/OthersBox';
import { GetGroupBestRegionProps, GetUserInfoProps } from '@/types/SpaceType';

const RecommendationItem = ({ name, latitude, longitude, moveUserInfo }: GetGroupBestRegionProps) => {
  const adminUser: GetUserInfoProps[] = moveUserInfo.filter((item) => item.isAdmin);
  const defaultUser: GetUserInfoProps[] = moveUserInfo.filter((item) => !item.isAdmin);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="rounded-tl-lg rounded-tr-lg p-3 bg-main_orange w-[1200px] h-[96px] ">
        <div className="font-Pretendard text-white text-h3 font-bold">{name}</div>
      </div>
      <div className="grid grid-cols-2 w-[100%]  p-10 gap-[20px]">
        {adminUser.map((item) => (
          <div key={item.userId}>
            <AdminBox
              name={item.userName}
              time={item.totalTime}
              money={item.totalDistance}
              transportType={item.transportationType}
              transportCount={item.transitCount}
            />
          </div>
        ))}
        {defaultUser.map((item) => (
          <div key={item.userId}>
            <OthersBox
              name={item.userName}
              time={item.totalTime}
              money={item.totalDistance}
              transportType={item.transportationType}
              transportCount={item.transitCount}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecommendationItem;
