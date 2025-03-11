import { useCallback, useEffect, useState } from 'react';
import { ModalNames } from '../types.ts';

interface useEzzyModalReturn {
  open(): void;
  close(): void;
  isOpen: boolean;
}

interface CustomToggleEvent extends Event, ToggleEvent {
  target: HTMLDetailsElement;
}

export const useEzzyModal = (name: ModalNames): useEzzyModalReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    window.ezzyModal[name].close();
  };

  const onOpen = () => {
    window.ezzyModal[name].showModal();
  };

  const toggleVisibility = useCallback((event: Event) => {
    const toggleEvent = event as CustomToggleEvent;
    return setIsOpen(toggleEvent.target.open);
  }, []);

  useEffect(() => {
    window.ezzyModal[name]?.addEventListener('toggle', toggleVisibility);

    return () => {
      window.ezzyModal[name]?.removeEventListener('toggle', toggleVisibility);
    };
  }, [name, toggleVisibility]);

  return {
    open: onOpen,
    isOpen: isOpen,
    close: onClose,
  };
};
