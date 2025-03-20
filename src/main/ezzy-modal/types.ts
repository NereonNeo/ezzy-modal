
export interface EzzyModalExtraNames {
    'ezzy-modal': 'Default id for modal testing',

}

export type ModalNames = keyof EzzyModalExtraNames;

declare global {
    interface Window {
        ezzyModal: Record<ModalNames, HTMLDialogElement>
    }
}

export interface CustomToggleEvent extends Event, ToggleEvent {
    target: HTMLDetailsElement;
}


export interface DefaultListeners {
    node: HTMLDialogElement;
    controller: AbortController;
}

export interface ListenersWithToggleHandler extends DefaultListeners {
    handler(isOpen: boolean): void
}

