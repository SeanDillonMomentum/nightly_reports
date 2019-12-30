import React from "react";
import ModalComponent from "./Modal";
import { CheckCircle } from "@material-ui/icons";
import styled from "styled-components";

const StyledCheck = styled(CheckCircle)`
  font-size: 36px;
  color: #001b49;
`;
const StyledButton = styled.button`
  background-color: #001b49;
  color: white;
  border-radius: 30px;
  padding: 8px;
  font-size: 15px;
`;

const StyledSuccessModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 45px 0 10px 0;
  }
  p {
    margin-bottom: 20px;
  }
`;

const SuccessModal = ({ modalOpen, setModalOpen, specialText }) => (
  <ModalComponent
    openState={modalOpen}
    width={"60%"}
    handleClose={() => setModalOpen(false)}
  >
    <StyledSuccessModal>
      <StyledCheck
        style={{
          fontSize: "80px",
          top: "-35px",
          position: "absolute",
          borderRadius: "50%",
          backgroundColor: "white"
        }}
      />
      <h1>Success!</h1>
      <p>{specialText}</p>
      <StyledButton onClick={() => setModalOpen(false)}>CLOSE</StyledButton>
    </StyledSuccessModal>
  </ModalComponent>
);

export default SuccessModal;
