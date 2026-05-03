// src/components/EmbeddedHtml.jsx

import React, { useRef, useEffect } from 'react';

/** Embeds a standalone HTML file, auto-adjusting height to fit content */
export default function EmbeddedHtml({ src, title }) {

    const iframeRef = useRef(null);

    useEffect(() => {

        const iframe = iframeRef.current;

        if (!iframe) return;

        const adjustHeight = () => {
            try {
                const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                iframe.style.height = innerDoc.documentElement.scrollHeight + 'px';
            } catch (e) {
                // Same-origin only; static files are same-origin, so this should work
            }
        };

        iframe.addEventListener('load', adjustHeight);
        return () => iframe.removeEventListener('load', adjustHeight);
    }, []);

    return (
        <iframe
            ref={iframeRef}
            src={src}
            title={title}
            style={{
                width: '100%',
                border: 'none',
                overflow: 'hidden',
            }}
        />
    );
}