import { useSelector } from 'react-redux';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const MODALS = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const Modal = () => {
  const modal = useSelector((state) => state.modal);

  if (!modal.type) return null;
  const Component = MODALS[modal.type];
  return <Component />;
};

export default Modal;
