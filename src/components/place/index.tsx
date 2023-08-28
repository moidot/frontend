import React from 'react';

const Place = () => {
  const onClick = async () => {
    //const param = await axios.get('http://localhost:8080/oauth2/authorization/kakao');
    //console.log(param.data);
  };

  return (
    <div>
      <h1>하이</h1>
      <h1>하이</h1>
      <h1>하이</h1>
      <button onClick={onClick}>버튼</button>
    </div>
  );
};
export default Place;
