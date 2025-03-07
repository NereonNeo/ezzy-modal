import { useRef } from 'react';
import { EzzyModal } from './main/ezzy-modal';

export function App() {
  const ref = useRef<HTMLDialogElement>(null);

  const handleOpenByRef = () => {
    ref.current?.showModal();
  };

  const handleOpenByWindow = () => {
    window.ezzy['ezzy-modal'].showModal();
  };

  return (
    <>
      <button onClick={handleOpenByRef}>Open by ref</button>
      <button onClick={handleOpenByWindow}>Open by window</button>

      <EzzyModal ref={ref} bodyScrollLock closeOnOverlayClick id={'ezzy-modal'}>
        <div
          style={{
            width: '500px',
            height: '400px',
          }}
        >
          My test modal!
        </div>
      </EzzyModal>
    </>
  );
}
