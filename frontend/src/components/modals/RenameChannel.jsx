import { useEffect, useRef, useState } from 'react';
import {
  FormControl, FormGroup, FormLabel, Button, Modal,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks/index';
import { selectors as channelSelectors } from '../../slices/channelsSlice';
import getChannelNameSchema from '../../yup';

const RenameChannel = (props) => {
  const [disabled, setDisable] = useState(false);
  const inputRef = useRef(null);
  const api = useApi();
  const { t } = useTranslation();
  const { onHide, modalInfo } = props;
  const { id, name } = modalInfo.item;
  const channelsNames = useSelector(channelSelectors.selectAll).map((channel) => channel.name);

  const nameSchema = getChannelNameSchema(channelsNames);

  const formik = useFormik({
    initialValues: { body: name },
    onSubmit: async (values) => {
      setDisable(true);
      try {
        await api.renameChannel({ id, name: values.body });
        setDisable(false);
        onHide();
        return toast.success(t('toast.success.renameChannel'));
      } catch (e) {
        return setDisable(false);
      }
    },
    validationSchema: nameSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.select();
    });
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              id="body"
              name="body"
              isInvalid={!!formik.errors.body}
            />
            <FormLabel className="visually-hidden" htmlFor="body">{t('modals.channelName')}</FormLabel>
            <FormControl.Feedback type="invalid">{t(formik.errors.body)}</FormControl.Feedback>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={disabled} onClick={() => onHide()}>
            {t('buttons.cancel')}
          </Button>
          <Button variant="primary" type="submit" disabled={disabled}>
            {t('buttons.send')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default RenameChannel;
