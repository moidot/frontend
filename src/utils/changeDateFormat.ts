//'yyyy-MM-DDT00:00:00' 데이터 날짜 포맷 변경 함수
export const handleDateFormat = (date: any) => {
  if (date) {
    let str: any = [];
    str = date.match(/\d+/g);
    console.log('str is... ', str);
    let time = parseInt(str[3]) > 11 ? '오후 ' : '오전 ';
    const hour = parseInt(str[3]) > 12 ? parseInt(str[3]) - 12 + '' : str[3];
    const endAtDate = str[1] + '월 ' + str[2] + '일 ' + time + ' ' + hour + ':' + str[5] + ' 까지';
    return endAtDate;
  }
};
