import { useEffect, useState } from 'react';
import { ModalNames } from '../types.ts';
import { togglerModalFunc } from '../utils.ts';

interface useEzzyModalReturn {
  openModal(): void;
  closeModal(): void;
  isOpen: boolean;
}

export const useEzzyModal = (name: ModalNames): useEzzyModalReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    window.ezzyModal[name]?.close();
  };

  const onOpen = () => {
    window.ezzyModal[name]?.showModal();
  };

  useEffect(() => {
    const controller = new AbortController();

    togglerModalFunc({
      node: window.ezzyModal[name],
      controller,
      handler: setIsOpen,
    });

    return () => {
      controller.abort();
    };
  }, [name]);

  return {
    openModal: onOpen,
    isOpen: isOpen,
    closeModal: onClose,
  };
};
