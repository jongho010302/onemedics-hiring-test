import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

// Types and Css
import { BoardType } from '../types';

// Etc
import { customAlert } from '../util';

interface BoardEditType {
  showEditModal: boolean;
  handleCloseEditModal: () => void;
  handleEditBoard: (content: string) => void;
  board: BoardType;
}

const BoardEdit: React.FC<BoardEditType> = ({ showEditModal, handleCloseEditModal, handleEditBoard, board }) => {

  const [password, setPassword] = useState('');
  const [isAuthenticated, setAuthenticate] = useState(false);
  const [content, setContent] = useState('');

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
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

  const handleSubmit = () => {
    if(!isAuthenticated) {
      customAlert('인증이 되어있지 않습니다.');
      handleClose();
      return;
    }

    handleEditBoard(content);
    handleCloseEditModal();
    setPassword('');
    setContent('');
    setAuthenticate(false);
    customAlert('수정되었습니다.');
  }

  const handleClose = () => {
    handleCloseEditModal();
    setPassword('');
    setContent('');
    setAuthenticate(false);
  }

  const printEditModalContent = () => {
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
            <div>내용: <textarea value={content} onChange={handleChangeContent} style={{ width: '90%', height: 70 }} /></div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              수정
            </Button>
          </Modal.Footer>
        </>
    )
  }

  return (
    <div>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>방명록 수정</Modal.Title>
        </Modal.Header>
        {printEditModalContent()}
      </Modal>
    </div>
  )
}

export default BoardEdit
