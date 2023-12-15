interface groupTitleProps {
  groupName: undefined | string;
  groupDate: any;
}

const VoteTitle = ({ groupName, groupDate }: groupTitleProps) => {
  return (
    <div className="mt-[60px]">
      <div className="text-center">
        <div className="text-h1 font-bold text-font_black">{groupName}</div>
        <div className="text-h3 font-bold text-font_gray">{groupDate}</div>
      </div>
    </div>
  );
};

export default VoteTitle;
