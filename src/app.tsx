import { useRef } from 'react';
import { EzzyModal, useEzzyModal } from './main/ezzy-modal';

export function App() {
  const ref = useRef<HTMLDialogElement>(null);
  const { open, close } = useEzzyModal('ezzy-modal');

  const handleOpenByRef = () => {
    ref.current?.showModal();
  };

  const handleOpenByWindow = () => {
    window.ezzyModal['ezzy-modal'].showModal();
  };

  const handleOpenByHook = () => {
    open();
  };

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
