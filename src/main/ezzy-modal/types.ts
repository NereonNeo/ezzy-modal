
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EzzyModalExtraNames { }

type RecursiveKeys<T> = T extends object
    ? {
        [K in keyof T]: K extends string
        ? T[K] extends object
        ? K | `${K}.${RecursiveKeys<T[K]>}`
        : K
        : never;
    }[keyof T]
    : never;

export type ModalNames = RecursiveKeys<EzzyModalExtraNames>;

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

