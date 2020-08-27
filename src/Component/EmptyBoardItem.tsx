import React from 'react';

const EmptyBoardItem: React.FC = () => {

  return (
    <div style={{ flexDirection: 'column' }}>
      <div style={{ width: '60%', margin: '0px auto', marginTop: 30, marginBottom: 20 }}>
        <span>등록된 글이 없습니다.</span>
      </div>
    </div>
  );
}

export default EmptyBoardItem;