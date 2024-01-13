import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks/index';

const RemoveChannel = (props) => {
  const [disabled, setDisable] = useState(false);
  const { t } = useTranslation();
  const api = useApi();
  const { onHide, modalInfo } = props;
  const { item } = modalInfo;

  const handleRemove = async (channel) => {
    setDisable(true);
    const { id } = channel;
    try {
      await api.removeChannel({ id });
      setDisable(false);
      onHide();
      return toast.success(t('toast.success.removeChannel'));
    } catch (e) {
      return setDisable(false);
    }
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.confirmMessage')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={disabled} onClick={() => onHide()}>
          {t('buttons.cancel')}
        </Button>
        <Button variant="danger" type="submit" disabled={disabled} onClick={() => handleRemove(item)}>
          {t('buttons.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
