import AdminBox from '../common/main/AdminBox';
import OthersBox from '../common/main/OthersBox';
import { GetGroupBestRegionProps, GetUserInfoProps } from '@/types/SpaceType';

const RecommendationItem = ({ name, moveUserInfo }: GetGroupBestRegionProps) => {
  console.log(moveUserInfo);
  const adminUser: GetUserInfoProps[] = moveUserInfo.filter((item) => item.isAdmin);
  // console.log(adminUser);
  const defaultUser: GetUserInfoProps[] = moveUserInfo.filter((item) => !item.isAdmin);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="rounded-tl-lg rounded-tr-lg pt-6 pl-10 bg-main_orange w-[1200px] h-[84px] ">
        <div className="font-Pretendard text-white text-b1 font-bold">{name}</div>
      </div>
      <div className="grid grid-cols-2 w-[100%] p-10 gap-[20px]">
        {adminUser.map((item, idx) => (
          <div key={idx}>
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
