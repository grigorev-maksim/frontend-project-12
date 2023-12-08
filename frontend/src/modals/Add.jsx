import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../slices/modalSlice';
import { channelSelector, setCurrentChannel } from '../slices/channelSlice';
import socket from '../socket.js';

const regexNotOnlySpaces = /[^\s*].*[^\s*]/g;

const Add = () => {
  const channels = useSelector(channelSelector.selectAll);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: yup.object({
      name: yup
        .string()
        .required(t('validationErrors.required'))
        .min(3, t('validationErrors.userLength'))
        .max(20, t('validationErrors.userLength'))
        .matches(regexNotOnlySpaces, t('modal.errorNotOnlySpaces'))
        .notOneOf(channels.map((channel) => channel.name), t('modal.errorUnique')),
    }),
    onSubmit: ({ name }) => {
      socket.emit('newChannel', { name: name.trim() }, (response) => {
        if (response.status !== 'ok') {
          toast.error(t('toasts.error.network'));
          return;
        }
        toast.success(t('toasts.success.newChanneladded'));
        dispatch(setCurrentChannel(response.data));
        dispatch(closeModal(modal));
      });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => { dispatch(closeModal(modal)); }}>
        <Modal.Title>{t('modal.header.adding')}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pb-0">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              id="name"
              name="name"
              type="text"
              isInvalid={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex flex-row-reverse m-3 me-0 gap-2">
            <Button variant="primary" type="submit">
              {t('modal.button.save')}
              <span className="visually-hidden">{t('modal.channelName')}</span>
            </Button>
            <Button variant="secondary" onClick={() => { dispatch(closeModal(modal)); }}>{t('modal.button.cancel')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
