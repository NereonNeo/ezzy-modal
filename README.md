# ezzy-modal

![npm](https://img.shields.io/npm/v/ezzy-modal?style=flat-square)
![license](https://img.shields.io/npm/l/ezzy-modal?style=flat-square)
![size](https://img.shields.io/bundlephobia/minzip/ezzy-modal?style=flat-square)

**ezzy-modal** — это минималистичная библиотека для создания модальных окон в React с помощью нативного [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog). Вес — всего ~1KB, а управление модалкой возможно как через `window`, так и через `ref`, без использования Redux, Context или встроенного хука `useState`.

## Особенности

- **Лёгкий вес** (~1KB, min+gzip)
- **Простота использования** — никаких дополнительных обвязок (Redux/Context)
- **Гибкий доступ**: `window` или `ref`
- **Использует `<dialog>`** — нативные методы открытия/закрытия

## Установка

```bash
# npm
npm install ezzy-modal
```

## Быстрый старт

1. Декларации для TypeScript
   Чтобы TypeScript понимал, какие модалки вы хотите использовать через window, создайте файл ezzy-modal.d.ts в корне вашего проекта:

```js
import 'ezzy-modal';

interface ModalNames {
  'loginModal': 'Login modal';
}

declare module 'ezzy-modal' {
  export interface EzzyModalExtraNames extends ModalNames {}
}

```

Здесь ModalNames объявляет ваши идентификаторы модалок (в примере это loginModal).
Если нужно больше модалок, просто расширьте этот интерфейс:

```js
interface ModalNames {
  loginModal: 'Login modal';
  signupModal: 'Signup modal';
  // ...
}
```

2. Импорт и использование в React-компоненте

```jsx
import React, { useRef } from 'react';
import EzzyModal from 'ezzy-modal';

function LoginComponent() {
  // Реф, чтобы обращаться к тегу <dialog> напрямую
  const ref = useRef < HTMLDialogElement > null;

  // Открытие модалки через ref
  const handleOpenByRef = () => {
    ref.current?.showModal();
  };

  // Открытие модалки через window
  const handleOpenByWindow = () => {
    // Для этого нужно объявить loginModal в ezzy-modal.d.ts, как выше
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

## Пропсы EzzyModal

Ниже перечислены основные пропсы, которые вы можете передать компоненту EzzyModal:

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>id</strong></td>
      <td><code>ModalNames</code></td>
      <td>—</td>
      <td><strong>Обязательный.</strong> Идентификатор модалки, связывающий её с глобальным объектом <code>window</code>.</td>
    </tr>
    <tr>
      <td><strong>isOpen?</strong></td>
      <td><code>boolean</code></td>
      <td><code>undefined</code></td>
      <td>Управляет состоянием модалки в контролируемом режиме: <code>true</code> — открыта, <code>false</code> — закрыта.</td>
    </tr>
    <tr>
      <td><strong>preventCloseOnEsc?</strong></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
      <td>Если <code>true</code>, модалка не закрывается по нажатию клавиши <code>Esc</code>.</td>
    </tr>
    <tr>
      <td><strong>closeOnOverlayClick?</strong></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
      <td>Если <code>true</code>, клик по оверлею (затемнённому фону) закрывает модалку.</td>
    </tr>
    <tr>
      <td><strong>wrapperClassname?</strong></td>
      <td><code>string</code></td>
      <td><code>""</code></td>
      <td>Дополнительный CSS класс для обёртки модального окна.</td>
    </tr>
    <tr>
      <td><strong>bodyScrollLock?</strong></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
      <td>Если <code>true</code>, блокирует прокрутку фона страницы при открытой модалке.</td>
    </tr>
    <tr>
      <td><strong>children</strong></td>
      <td><code>React.ReactNode</code></td>
      <td>—</td>
      <td><strong>Обязательный.</strong> Содержимое, которое отображается внутри модального окна.</td>
    </tr>
  </tbody>
</table>

## Дополнительно

- **Закрытие модалки**:

  - Через `ref`: используйте `ref.current?.close()`
  - Через `window`: вызовите `window.loginModal.close()`

- **Стилизация**:
  - Если хотите подключить стили добавьте `import 'ezzy-modal/dist/index.css'`
  - Используйте проп `wrapperClassname` для задания дополнительного CSS-класса обёртки.
