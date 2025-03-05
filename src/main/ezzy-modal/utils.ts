import { ForwardedRef, RefObject } from "react";

export function preventCloseOnEscFunc({
    node,
    controller,
}: {
    node: HTMLDialogElement;
    controller: AbortController;
}) {
    node.addEventListener(
        'keydown',
        (event) => {
            if (event.key !== 'Escape') return;
            event.preventDefault();
        },
        { signal: controller.signal }
    );
}

export function closeOutOfModalFunc({
    node,
    controller,
}: {
    node: HTMLDialogElement;
    controller: AbortController;
}) {
    node.addEventListener(
        'click',
        (event) => {
            const isClickOnDialog = event.target === event.currentTarget;

            if (isClickOnDialog) {
                node?.close();
            }
        },
        { signal: controller.signal }
    );
}

export function combineRefs<T>(...refs: (RefObject<T> | ForwardedRef<T> | null)[]) {
    return (instance: T | null) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(instance);
            } else if (ref && 'current' in ref) {
                ref.current = instance;
            }
        });
    };
}