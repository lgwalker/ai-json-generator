import { useState } from 'react';
import { ModalState } from '../types';

export const useModal = () => {
  const [modal, setModal] = useState<ModalState>({
    show: false,
    type: '',
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
    inputValue: ''
  });

  const showModal = (
    type: 'alert' | 'confirm' | 'prompt',
    title: string,
    message: string,
    onConfirm: (value?: string) => void,
    onCancel: (() => void) | null = null,
    inputValue: string = ''
  ) => {
    setModal({ show: true, type, title, message, onConfirm, onCancel, inputValue });
  };

  const hideModal = () => {
    setModal({ show: false, type: '', title: '', message: '', onConfirm: null, onCancel: null, inputValue: '' });
  };

  const handleModalConfirm = () => {
    if (modal.onConfirm) {
      modal.onConfirm(modal.inputValue);
    }
    hideModal();
  };

  const handleModalCancel = () => {
    if (modal.onCancel) {
      modal.onCancel();
    }
    hideModal();
  };

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && modal.type === 'prompt') {
      e.preventDefault();
      handleModalConfirm();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleModalCancel();
    }
  };

  const setModalInputValue = (value: string) => {
    setModal(prev => ({ ...prev, inputValue: value }));
  };

  return {
    modal,
    showModal,
    hideModal,
    handleModalConfirm,
    handleModalCancel,
    handleModalKeyDown,
    setModalInputValue
  };
};