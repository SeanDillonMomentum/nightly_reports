import React, { useEffect, useContext } from "react";
//components
import Modal from "./styles";
import { Context } from "../../routers/AppRouter";
const ModalComponent = ({ openState, children, width, handleClose }) => {
  const { show } = useContext(Context);
  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    document.addEventListener("touchstart", handleClick, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
      document.removeEventListener("touchstart", handleClick, false);
    };
  });

  const handleClick = e => {
    if (e.target.id === "modalBackground") {
      return handleClose();
    } else {
      return;
    }
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      return handleClose();
    } else {
      return;
    }
  };

  return (
    openState && (
      <Modal sideNavOpen={show} id="modalBackground" width={width}>
        <div
          role="button"
          tabIndex="0"
          className="modalMain"
          onKeyPress={e => handleKeyPress(e)}
          onClick={e => handleClick(e)}
        >
          {children}
        </div>
      </Modal>
    )
  );
};

export default ModalComponent;
