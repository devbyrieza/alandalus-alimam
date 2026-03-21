"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function useScrollRestoration() {
  const pathname = usePathname();
  const isPopState = useRef(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handlePopState = () => {
      isPopState.current = true;
      const lenis = (window as any).lenis;
      if (lenis) lenis.stop(); // Prevent visual jumps while navigating
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-pos-${pathname}`, window.scrollY.toString());
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });

    if (isPopState.current) {
      const savedScroll = sessionStorage.getItem(`scroll-pos-${pathname}`);
      if (savedScroll !== null) {
        const restoreScroll = () => {
          const lenis = (window as any).lenis;
          const pos = parseInt(savedScroll, 10);
          
          if (lenis) {
            lenis.start();
            lenis.scrollTo(pos, { immediate: true, force: true, lock: true });
          } else {
            window.scrollTo({
              top: pos,
              behavior: "instant"
            });
          }
        };
        
        // Multi-stage restoration to overcome Next.js potential auto-scroll
        setTimeout(restoreScroll, 10);
        setTimeout(restoreScroll, 50);
        setTimeout(restoreScroll, 150);
        setTimeout(restoreScroll, 300);
      }
      isPopState.current = false;
    }

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [pathname]);
}
