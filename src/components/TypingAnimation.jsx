// src/components/TypingAnimation.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export default function TypingAnimation({
  children,
  className,
  duration = 90, // harf başına ms
  delay = 0,
  hideCursorWhenDone = false,
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const text = typeof children === "string" ? children : "";

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
      setIsTyping(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
        setIsTyping(false);
      }
    }, duration);

    return () => clearInterval(typingEffect);
  }, [text, duration, started]);

  const shouldShowCursor =
    started && (isTyping || (!hideCursorWhenDone && !isTyping));

  return (
    <div
      className={cn(
        "font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm",
        className
      )}
    >
      <span>
        {displayedText}
        {shouldShowCursor && (
          <motion.span
            animate={
              isTyping
                ? { opacity: 1 }
                : { opacity: [1, 0, 1] }
            }
            transition={
              isTyping
                ? { duration: 0 }
                : { duration: 0.8, repeat: Infinity, ease: "linear" }
            }
            className="inline-block w-[3px] h-[1em] bg-white ml-1 align-middle"
          />
        )}
      </span>
    </div>
  );
}