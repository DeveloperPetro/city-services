import { useState, useEffect, useCallback } from "react";


export function useWindowResize() {
    const [isMobile, setMobile] = useState(false);
    const [isTablet, setTablet] = useState(false);
    const [isLaptop, setLaptop] = useState(false);
    const [isDesktop, setDesktop] = useState(false);

    const handleResizeMobile = useCallback(() => {
        if (window.innerWidth < 768) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }, [setMobile]);

    useEffect(() => {
        window.addEventListener("resize", handleResizeMobile);
        handleResizeMobile();
        return () => {
            window.removeEventListener("resize", handleResizeMobile);
        };
    }, [handleResizeMobile]);

    const handleResizeTablet = useCallback(() => {
        if (window.innerWidth >= 768 && window.innerWidth < 1024) {
            setTablet(true);
        } else {
            setTablet(false);
        }
    }, [setTablet]);

    useEffect(() => {
        window.addEventListener("resize", handleResizeTablet);
        handleResizeTablet();
        return () => {
            window.removeEventListener("resize", handleResizeTablet);
        };
    }, [handleResizeTablet]);

    const handleResizeLaptop = useCallback(() => {
        if (window.innerWidth >= 1024 && window.innerWidth < 1366) {
            setLaptop(true);
        } else {
            setLaptop(false);
        }
    }, [setLaptop]);

    useEffect(() => {
        window.addEventListener("resize", handleResizeLaptop);
        handleResizeLaptop();
        return () => {
            window.removeEventListener("resize", handleResizeLaptop);
        };
    }, [handleResizeLaptop]);

    const handleResizeDesktop = useCallback(() => {
        if (window.innerWidth >= 1366) {
            setDesktop(true);
        } else {
            setDesktop(false);
        }
    }, [setDesktop]);

    useEffect(() => {
        window.addEventListener("resize", handleResizeDesktop);
        handleResizeDesktop();
        return () => {
            window.removeEventListener("resize", handleResizeDesktop);
        };
    }, [handleResizeDesktop]);

    return { isMobile, isTablet, isLaptop, isDesktop };
}