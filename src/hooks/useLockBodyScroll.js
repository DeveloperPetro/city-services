import { useEffect } from "react";


export function useLockBodyScroll(boolean) {
    useEffect(() => {
        if (boolean) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [boolean]);
}