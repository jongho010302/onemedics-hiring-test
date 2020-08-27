import React, { useState } from 'react';

// Types and Styles
import './style/Board.css';
import { BoardType } from '../types';

// Component
import BoardItem from './BoardItem';
import EmptyBoardItem from './EmptyBoardItem';
import BoardEdit from './BoardEdit';
import BoardDelete from './BoardDelete';

// 
import { customAlert, getFormatDate } from '../util';


const Board: React.FC = () => {
  const [boardList, setBoardList] = useState<BoardType[]>([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [selectedBoard, setSelectedBoard] = useState<BoardType>({ name: '', password: '', content: '', date: '' }); // Edit이나 Delete 할 때 선택된 Board를 의미.

  // Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  /* Board Function List */
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  }

  const handleClickAdd = (): void => {
    /* Validation */
    if(!name) {
      customAlert('이름을 입력해주세요.');
      return;
    } else if(!password) {
      customAlert('비밀번호를 입력해주세요.');
      return;
    } else if(!content) {
      customAlert('내용을 입력해주세요.');
      return;
    }

    const newBoardList = [...boardList];
    const boardItem = {
      name, password, content, date: getFormatDate(new Date())
    };

    newBoardList.unshift(boardItem);
    setBoardList(newBoardList);

    setName('');
    setPassword('');
    setContent('');
  }

  const printBoardList = () => {
    if(!boardList.length) {
      return (
        <EmptyBoardItem />
      )
    }
    return (
      boardList.map((item, index) => (
        <BoardItem
          key={index}
          board={item}
          handleClickEdit={handleClickEdit}
          handleClickDelete={handleClickDelete}
        />
      ))
    )
  }

  /* BoardItem Function List */
  const handleClickEdit = (board: BoardType): void => {
    setShowEditModal(true);
    setSelectedBoard(board);
  }

  const handleClickDelete = (board: BoardType): void => {
    setShowDeleteModal(true);
    setSelectedBoard(board);
  }

  /* Modal Function List */
  const handleCloseEditModal = (): void => {
    setShowEditModal(false);
  }

  const handleCloseDeleteModal = (): void => {
    setShowDeleteModal(false);
  }

  const handleEditBoard = (content: string): void => {
    const newBoardList = [...boardList];
    const boardIndex = boardList.indexOf(selectedBoard);

    const boardItem = {...selectedBoard, content};

    newBoardList[boardIndex] = boardItem;

    setBoardList(newBoardList);
  }

  const handleDeleteBoard = (): void => {
    const newBoardList = [...boardList];
    const boardIndex = boardList.indexOf(selectedBoard);

    newBoardList.splice(boardIndex, 1);

    setBoardList(newBoardList);
  }

  return (
    <div style={{ width: '60%', marginTop: 20 }}>
      <div className="Container" style={{ marginBottom: 10 }}>
        <div style={{ marginRight: 20 }}>이름: <input value={name} onChange={handleChangeName} /></div>
        <div>비밀번호: <input type="password" value={password} onChange={handleChangePassword} /></div>
      </div>
      
      <div className="Container" style={{ marginBottom: 10 }}>
        <textarea value={content} onChange={handleChangeContent} placeholder="내용" style={{ width: '60%', height: '100px' }} />
      </div>

      <div className="Container" style={{ marginBottom: 30 }}>
        <button onClick={handleClickAdd} style={{ width: 200, height: 40, borderRadius: 10}}>등록하기</button>
      </div>

      <hr style={{ marginBottom: 20 }} />

      {printBoardList()}

      <BoardEdit
        showEditModal={showEditModal}
        handleCloseEditModal={handleCloseEditModal}
        handleEditBoard={handleEditBoard}
        board={selectedBoard}
      />

      <BoardDelete
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDeleteBoard={handleDeleteBoard}
        board={selectedBoard}
      />

    </div>
  );
}



export default Board;
