
export interface EzzyModalExtraNames {
    'ezzy-modal': 'Default id for modal testing'
}

export type ModalNames = keyof EzzyModalExtraNames;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Window extends Record<ModalNames, HTMLDialogElement> {
    }
}

