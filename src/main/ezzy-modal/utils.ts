import { ForwardedRef, RefObject } from "react";
import { CustomToggleEvent, DefaultListeners, ListenersWithToggleHandler } from "./types";

export function preventCloseOnEscFunc({
    node,
    controller,
}: DefaultListeners) {
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
}: DefaultListeners) {
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

export function togglerModalFunc({
    node, controller, handler
}: ListenersWithToggleHandler) {
    node.addEventListener('toggle', () => {
        const toggleEvent = event as CustomToggleEvent;
        handler(toggleEvent.target.open)
    }, { signal: controller.signal })
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