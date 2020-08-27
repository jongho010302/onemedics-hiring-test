import React from 'react';

import Board from './Component/Board';
import 'bootstrap/dist/css/bootstrap.min.css';

// 부트스트랩은 Edit 할 때의 모달만을 위해 사용했습니다.

const App: React.FC = () => {
  return (
    <Board />
  );
}



export default App;
