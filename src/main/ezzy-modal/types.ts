
export interface EzzyModalExtraNames {
    'ezzy-modal': 'Default id for modal testing',

}

export type ModalNames = keyof EzzyModalExtraNames;

declare global {
    interface Window {
        ezzy: Record<ModalNames, HTMLDialogElement>
    }
}

