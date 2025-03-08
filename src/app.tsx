import { useRef } from 'react';
import { EzzyModal, useEzzyModal } from './main/ezzy-modal';
const text = 'ezzy-modal';

export function App() {
  const ref = useRef<HTMLDialogElement>(null);
  const { open, close, isOpen } = useEzzyModal(text);

  const handleOpenByRef = () => {
    ref.current?.showModal();
  };

  const handleOpenByWindow = () => {
    window.ezzy['ezzy-modal'].showModal();
  };

  const handleOpenByHook = () => {
    open();
  };

  console.log(isOpen);

  return (
    <>
      <button onClick={handleOpenByRef}>Open by ref</button>
      <button onClick={handleOpenByWindow}>Open by window</button>
      <button onClick={handleOpenByHook}>Open by hook</button>

      <EzzyModal ref={ref} bodyScrollLock closeOnOverlayClick id={'ezzy-modal'}>
        <div
          style={{
            width: '500px',
            height: '400px',
          }}
        >
          My test modal!
          <button onClick={close}>Close by hook</button>
        </div>
      </EzzyModal>
    </>
  );
}
