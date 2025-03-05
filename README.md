# ezzy-modal

![npm](https://img.shields.io/npm/v/ezzy-modal?style=flat-square)
![license](https://img.shields.io/npm/l/ezzy-modal?style=flat-square)
![size](https://img.shields.io/bundlephobia/minzip/ezzy-modal?style=flat-square)

**ezzy-modal** — This is a minimalist library for creating modal dialogs in React using the native [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element. It weighs only ~1KB, and modal management can be done either through the `window` object or via a `ref`, without relying on Redux, Context, or the built-in `useState` hook.

## Features

- **Lightweight** (~1KB, minified + gzipped)
- **Ease of Use** — no extra wrappers (Redux/Context)
- **Flexible Access**: via `window` or `ref`
- **Uses `<dialog>`** — native open/close methods

## Installation

```bash
# npm
npm install ezzy-modal
```

## Quick Start

1. TypeScript Declarations
   To allow TypeScript to understand which modals you want to use via the window, create an `ezzy-modal.d.ts `file at the root of your project:

```js
import 'ezzy-modal';

interface ModalNames {
  'loginModal': 'Login modal';
}

declare module 'ezzy-modal' {
  export interface EzzyModalExtraNames extends ModalNames {}
}

```

Here, `ModalNames` declares your modal identifiers (in the example, it's `loginModal`). If you need more modals, simply extend this interface:

```js
interface ModalNames {
  loginModal: 'Login modal';
  signupModal: 'Signup modal';
  // ...
}
```

2. Import and Usage in a React Component

```jsx
import React, { useRef } from 'react';
import EzzyModal from 'ezzy-modal';

function LoginComponent() {
  // A ref to directly access the <dialog> tag
  const ref = useRef < HTMLDialogElement > null;

  // Opening the modal using the ref
  const handleOpenByRef = () => {
    ref.current?.showModal();
  };

  // Opening the modal via window
  const handleOpenByWindow = () => {
    // For this, you need to declare loginModal in ezzy-modal.d.ts, as shown above
    window.loginModal.showModal();
  };

  return (
    <>
      <button onClick={handleOpenByRef}>Open by ref</button>
      <button onClick={handleOpenByWindow}>Open by window</button>

      <EzzyModal ref={ref} bodyScrollLock closeOnOverlayClick id={'loginModal'}>
        <div style={{ width: '500px', height: '400px' }}>My test modal!</div>
      </EzzyModal>
    </>
  );
}

export default LoginComponent;
```

## EzzyModal Main Props

Below are the key props you can pass to the EzzyModal component:

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>id</strong></td>
      <td><code>ModalNames</code></td>
      <td>—</td>
      <td><strong>Required.</strong> The modal identifier that links it to the global <code>window</code> object.</td>
    </tr>
    <tr>
      <td><strong>isOpen?</strong></td>
      <td><code>boolean</code></td>
      <td><code>undefined</code></td>
      <td>Controls the modal's state in a controlled mode: <code>true</code> means open, <code>false</code> means closed.</td>
    </tr>
    <tr>
      <td><strong>preventCloseOnEsc?</strong></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
      <td>If <code>true</code>, the modal will not close when the <code>Esc</code> key is pressed.</td>
    </tr>
    <tr>
      <td><strong>closeOnOverlayClick?</strong></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
      <td>If <code>true</code>, clicking on the overlay (dimmed background) will close the modal.</td>
    </tr>
    <tr>
      <td><strong>wrapperClassname?</strong></td>
      <td><code>string</code></td>
      <td><code>""</code></td>
      <td>An additional CSS class for the modal wrapper.</td>
    </tr>
    <tr>
      <td><strong>bodyScrollLock?</strong></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
      <td>If <code>true</code>, it prevents background page scrolling when the modal is open.</td>
    </tr>
    <tr>
      <td><strong>children</strong></td>
      <td><code>React.ReactNode</code></td>
      <td>—</td>
      <td><strong>Required.</strong> The content to be displayed inside the modal.</td>
    </tr>
  </tbody>
</table>

## Additional

- **Closing the Modal**:

  - Via `ref`: use `ref.current?.close()`
  - Via `window`: use `window.[your-modal-name].close()`

- **Styling**:
  - If you want to include the styles, add `import 'ezzy-modal/dist/index.css'`
  - Use the `wrapperClassname` prop to assign an additional CSS class to the wrapper.
