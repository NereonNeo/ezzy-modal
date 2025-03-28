import { ForwardedRef, RefObject } from "react";
import { DefaultListeners, ListenersWithToggleHandler } from "./types.ts";

export function preventCloseOnEscFunc({
    node,
    controller,
}: DefaultListeners) {
    node?.addEventListener(
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
}: DefaultListeners) {
    node?.addEventListener(
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

export function modalStateObserverFunc({
    node, controller, handler
}: ListenersWithToggleHandler) {
    const observer = new MutationObserver((list) => {
        const target = list[0].target as HTMLDialogElement
        handler(target.open)
    });

    observer.observe(node, { attributes: true })

    if (controller.signal.aborted) {
        observer.disconnect()
    }
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