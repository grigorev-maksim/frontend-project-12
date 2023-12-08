import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../slices/modalSlice';
import { channelSelector } from '../slices/channelSlice';
import socket from '../socket.js';

const regexNotOnlySpaces = /[^\s*].*[^\s*]/g;

const Rename = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const channels = useSelector(channelSelector.selectAll);
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: { name: channels.find((channel) => channel.id === modal.channelId).name },
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
      socket.emit('renameChannel', { id: modal.channelId, name: name.trim() }, (response) => {
        if (response.status !== 'ok') {
          toast.error(t('toasts.error.network'));
          return;
        }
        toast.success(t('toasts.success.channelRenamed'));
        dispatch(closeModal(modal));
      });
    },
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => { dispatch(closeModal(modal)); }}>
        <Modal.Title>{t('modal.header.renaming')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label className="visually-hidden">{t('modal.channelName')}</Form.Label>
            <Form.Control
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex flex-row-reverse mt-3 gap-2">
            <Button variant="primary" type="submit">
              {t('modal.button.save')}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(closeModal(modal));
              }}
            >
              {t('modal.button.cancel')}
            </Button>
          </div>
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default Rename;
