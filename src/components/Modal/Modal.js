import React, { useEffect, useContext } from 'react';
//components
import Modal from './styles';
import { Context } from '../../routers/AppRouter';
const ModalComponent = ({ openState, children, width, handleClose }) => {
  const { show } = useContext(Context);
  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    document.addEventListener('touchstart', handleClick, false);
    return () => {
      document.removeEventListener('mousedown', handleClick, false);
      document.removeEventListener('touchstart', handleClick, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = e => {
    if (e.target.id === 'modalBackground') {
      return handleClose();
    } else {
      return;
    }
  };

  return (
    openState && (
      <Modal sideNavOpen={show} id="modalBackground" width={width}>
        <div className="modalMain" onClick={e => handleClick(e)}>
          {children}
        </div>
      </Modal>
    )
  );
};

export default ModalComponent;
