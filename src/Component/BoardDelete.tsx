import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

// Types and Css
import { BoardType } from '../types';

// Etc
import { customAlert } from '../util';

interface BoardDeleteType {
  showDeleteModal: boolean;
  handleCloseDeleteModal: () => void;
  handleDeleteBoard: () => void;
  board: BoardType;
}

const BoardDelete: React.FC<BoardDeleteType> = ({ showDeleteModal, handleCloseDeleteModal, handleDeleteBoard, board }) => {

  const [password, setPassword] = useState('');
  const [isAuthenticated, setAuthenticate] = useState(false);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleCheckPassword = () => {
    if(board.password !== password) {
      setPassword('');
      customAlert('비밀번호가 다릅니다');
      return;
    }

    setAuthenticate(true);
    return;
  }

  const handleClickDelete = () => {
    if(!isAuthenticated) {
      customAlert('인증이 되어있지 않습니다.');
      handleClose();
      return;
    }

    setPassword('');
    handleDeleteBoard();
    handleCloseDeleteModal();
    setAuthenticate(false);
    customAlert('삭제되었습니다.');
  }

  const handleClose = () => {
    handleCloseDeleteModal();
    setPassword('');
    setAuthenticate(false);
  }

  const printDeleteModalContent = () => {
    if(!isAuthenticated) {
      return (
        <>
          <Modal.Body>
            <div>비밀번호: <input type="password" value={password} onChange={handleChangePassword} /></div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button variant="primary" onClick={handleCheckPassword}>
              입력
            </Button>
          </Modal.Footer>
        </>
      );
    }
    return (
      <>
        <Modal.Body>
          <div>삭제를 하시면 해당 방명록은 복구할 수 없습니다.</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="danger" onClick={handleClickDelete}>
            삭제
          </Button>
        </Modal.Footer>
      </>
    )
  }


  return (
    <div>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>방명록 삭제</Modal.Title>
        </Modal.Header>

        {printDeleteModalContent()}
      </Modal>
    </div>
  )
}

export default BoardDelete;
