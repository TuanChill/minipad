import { useEffect, useRef } from "react";

export const useKey = (key: string, cb: () => void) => {
    const callback = useRef<() => void>(cb);

    useEffect(() => {
        callback.current = cb;
    }, [cb]);

    useEffect(() => {
        function handle(event: KeyboardEvent) {
            if (event.code === key) {
                callback.current();
            } else if (key === 'ctrls' && event.key === 's' && event.ctrlKey) {
                event.preventDefault();
                callback.current();
            }
        }

        document.addEventListener('keydown', handle);
        return () => document.removeEventListener("keydown", handle);
    }, [key]);
};
