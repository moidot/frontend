import TaxiButton from '@assets/main/taxi.svg';
import SubwayButton from '@assets/main/subway.svg';
import OthersMore from '@assets/main/others_more.svg';

export interface NaviProps {
  name: string;
  transportCount?: number;
  time: number;
  money?: number;
  transportType: TransportType;
}
export type TransportType = 'TAXI' | 'PUBLIC';

const OthersBox = ({ name, transportCount, transportType, money, time }: NaviProps) => {
  const hour = Math.floor(time / 60);
  const min = time % 60;
  return (
    <div className="bg-light_orange w-[100%]  rounded-2xl flex-row p-3">
      <div className=" flex content-center items-center flex-row justify-between">
        <div className="flex content-center items-center gap-[8px] ">
          <div className="font-Pretendard text-black text-b1 font-bold ">{name}</div>
        </div>
        <div className="flex content-center items-center flex-row gap-4 ">
          <div className="flex content-center items-center flex-col">
            <div className="font-Pretendard text-font_gray text-b4 font-regular ">
              {transportCount == null ? '통행료 ' + money + '원' : '환승 ' + transportCount + '번'}
            </div>
            <div className="font-Pretendard text-main_orange text-b1 font-bold ">
              {hour == 0 ? min + '분' : hour + '시간 ' + min + '분'}
            </div>
          </div>
          <div className="flex items-center flex-row gap-4">
            {transportType == 'PUBLIC' ? <SubwayButton /> : <TaxiButton />}
            <OthersMore />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OthersBox;
