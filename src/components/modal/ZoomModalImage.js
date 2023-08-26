import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { FaTimesCircle } from "react-icons/fa";
// Styled component for the backdrop
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled component for the modal content
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 95vw;
  min-height: 300px;
`;
const ModalHeader = styled.div`
  text-align: right;
`;
// Modal component
const Modal = ({ setShowModal, children }) => {
  return ReactDOM.createPortal(
    <Backdrop>
      <ModalContent>
        <ModalHeader>
          <FaTimesCircle
            cursor={"pointer"}
            color="gray"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}
          />
        </ModalHeader>

        {children}
      </ModalContent>
    </Backdrop>,
    document.getElementById("modal-root") // This element should exist in the HTML file
  );
};

export default Modal;
