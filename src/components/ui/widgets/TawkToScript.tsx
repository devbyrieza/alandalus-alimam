"use client";

import Script from "next/script";
import { useEffect } from "react";

// Tawk.to Property ID specified by user
const PROPERTY_ID = "69997c299d60291c30387e88";
const WIDGET_ID = "default";

export default function TawkToScript() {
    useEffect(() => {
        // Define the Tawk_API object and hide default widget on load
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();
        window.Tawk_API.onLoad = function () {
            window.Tawk_API.hideWidget();
        };
    }, []);

    return (
        <Script
            id="tawk-to-script"
            strategy="lazyOnload"
            src={`https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`}
        />
    );
}

// Ensure Tawk_API exists on the window object for TypeScript
declare global {
    interface Window {
        Tawk_API: any;
        Tawk_LoadStart: any;
    }
}
