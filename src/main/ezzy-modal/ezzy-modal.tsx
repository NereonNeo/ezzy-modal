import { clsx } from 'clsx';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import './index.css';
import { ModalNames } from './types.ts';
import {
  closeOutOfModalFunc,
  combineRefs,
  preventCloseOnEscFunc,
  togglerModalFunc,
} from './utils.ts';

type ExtendWithOmit = Omit<React.ComponentProps<'dialog'>, 'open'>;

interface EzzyModalProps extends ExtendWithOmit {
  id: ModalNames;
  isOpen?: boolean;
  preventCloseOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  wrapperClassname?: string;
  bodyScrollLock?: boolean;
  children: React.ReactNode;
}

export const EzzyModal = forwardRef<HTMLDialogElement, EzzyModalProps>(
  (props: EzzyModalProps, ref) => {
    const {
      id,
      isOpen,
      children,
      className,
      bodyScrollLock,
      wrapperClassname,
      preventCloseOnEsc = false,
      closeOnOverlayClick = false,
      ...otherProps
    } = props;
    const indexRef = useRef<HTMLDialogElement>(null);
    const [showChildren, setShowChildren] = useState(false);

    const elementStoreRegistry = useCallback(() => {
      const nodeAccessWindow = Object.assign({}, window.ezzyModal, {
        [id]: indexRef.current,
      });

      Object.defineProperty(nodeAccessWindow, id, {
        value: indexRef.current,
        writable: false,
        configurable: false,
      });

      Object.defineProperty(window, 'ezzyModal', {
        value: nodeAccessWindow,
        writable: false,
        configurable: true,
      });
    }, [id]);

    useEffect(() => {
      if (!indexRef.current) return;
      elementStoreRegistry();

      const controller = new AbortController();

      if (isOpen) indexRef.current?.showModal();

      if (preventCloseOnEsc)
        preventCloseOnEscFunc({
          node: indexRef.current,
          controller,
        });

      if (closeOnOverlayClick)
        closeOutOfModalFunc({
          node: indexRef.current,
          controller,
        });

      togglerModalFunc({
        node: indexRef.current,
        controller,
        handler: setShowChildren,
      });

      return () => {
        controller.abort();
      };
    }, [isOpen, closeOnOverlayClick, preventCloseOnEsc, elementStoreRegistry]);

    return (
      <dialog
        aria-modal="true"
        data-lock={bodyScrollLock}
        className={clsx('ezzy-modal', className)}
        ref={combineRefs(indexRef, ref)}
        {...otherProps}
      >
        <div className={clsx('ezzy-modal-content-wrapper', wrapperClassname)}>
          {showChildren && children}
        </div>
      </dialog>
    );
  }
);
