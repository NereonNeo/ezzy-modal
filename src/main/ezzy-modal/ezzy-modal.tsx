import { clsx } from 'clsx';
import { forwardRef, useEffect, useRef } from 'react';
import './index.css';
import { ModalNames } from './types.ts';
import {
  closeOutOfModalFunc,
  combineRefs,
  preventCloseOnEscFunc,
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

    useEffect(() => {
      const controller = new AbortController();
      if (!indexRef.current) return;

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

      return () => {
        controller.abort();
      };
    }, [isOpen, closeOnOverlayClick, preventCloseOnEsc]);

    return (
      <dialog
        id={id}
        data-lock={bodyScrollLock}
        className={clsx('ezzy-modal', className)}
        ref={combineRefs(indexRef, ref)}
        {...otherProps}
      >
        <div className={clsx('ezzy-modal-content-wrapper', wrapperClassname)}>
          {children}
        </div>
      </dialog>
    );
  }
);
