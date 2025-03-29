import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const TypingMarkdown = ({ content }) => {
    const [visibleChars, setVisibleChars] = useState(0);

    useEffect(() => {
        const animate = () => {
            setVisibleChars(prev => {
                if (prev >= content.length) return prev;
                // Type faster at start, slower for long messages
                const speed = Math.min(50, 500 / (prev + 1));
                requestAnimationFrame(animate);
                return prev + 1;
            });
        };
        animate();
    }, [content]);

    return <ReactMarkdown>{content.substring(0, visibleChars)}</ReactMarkdown>;
};

export default TypingMarkdown;