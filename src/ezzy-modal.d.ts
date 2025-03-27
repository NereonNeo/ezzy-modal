import './main/ezzy-modal';

interface ModalNames {
    'ezzy-modal': 'ezzy test modal';
}

declare module './main/ezzy-modal' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface EzzyModalExtraNames extends ModalNames { }
}