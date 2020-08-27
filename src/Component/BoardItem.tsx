import React from 'react';

import './style/BoardItem.css';
import { BoardType } from '../types';

interface BoardItemType {
  board: BoardType;
  handleClickEdit: (board: BoardType) => void;
  handleClickDelete: (board: BoardType) => void;
}

const BoardItem: React.FC<BoardItemType> = ({ board, handleClickEdit, handleClickDelete }) => {

  return (
    <div style={{ flexDirection: 'column' }}>
      <div style={{ width: '60%', margin: '0px auto', marginTop: 30, marginBottom: 20 }}>
        <span>{board.content}</span>
      </div>

      <div className="BoardContainer" style={{ width: '80%', margin: '0px auto' }}>
        <div>{board.name}</div>
          <div>{board.date}</div>
          <div>
            <button onClick={() => handleClickEdit(board)} style={{ width: 100, height: 30, marginRight: 10 }}>수정</button>
            <button onClick={() => handleClickDelete(board)} style={{ width: 100, height: 30 }}>삭제</button>
          </div>
      </div>
      <hr className="dottedLineHr" style={{ marginTop: 30 }} />
    </div>
  );
}

export default BoardItem;