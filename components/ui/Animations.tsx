"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import { motion, MotionConfig } from "motion/react";

interface HtmlCommentProps {
  label: string;
}

export function HtmlComment({ label }: HtmlCommentProps) {
  return (
    <div className="my-8 font-mono text-sm">
      <span className="text-ide-syntax-comment">&lt;!-- </span>
      <span className="text-ide-property">{label}</span>
      <span className="text-ide-syntax-comment"> --&gt;</span>
    </div>
  );
}

interface ScrambleTextProps {
  children: string;
  className?: string;
}

export function ScrambleText({ children, className = "" }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const chars = children.split("");
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!ref.current) return;

    const chars = children.split("");
    const centerIdx = Math.floor(chars.length / 2);

    // Stagger order: reveal from center outward
    const order = Array.from({ length: chars.length }, (_, i) =>
      Math.abs(i - centerIdx)
    );

    // Group indices by stagger order
    const staggerOrder = chars.map((_, i) => i).sort((a, b) => order[a] - order[b]);

    const symbols = "~!@#$%^&*ABCDEFabcdef0-9";
    const animationDuration = 300; // ms per character
    let startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      staggerOrder.forEach((charIdx, staggerIdx) => {
        const charEl = charRefs.current[charIdx];
        if (!charEl) return;

        const charDelay = staggerIdx * 50; // 50ms between each char
        const charElapsed = elapsed - charDelay;

        if (charElapsed < 0) {
          charEl.textContent = chars[charIdx];
        } else if (charElapsed < animationDuration) {
          // Scramble phase
          const progress = charElapsed / animationDuration;
          const symbolIdx = Math.floor(progress * symbols.length);
          charEl.textContent = symbols[symbolIdx % symbols.length];
        } else {
          // Final phase - show actual character
          charEl.textContent = chars[charIdx];
        }
      });

      if (elapsed < animationDuration + staggerOrder.length * 50 + 100) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [children]);

  return (
    <span ref={ref} className={className}>
      {chars.map((char, idx) => (
        <span
          key={idx}
          ref={(el) => {
            charRefs.current[idx] = el;
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

/** Fade + rise reveal animation for content entering viewport */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container for lists/grids */
export function Stagger({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Individual stagger item */
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Animated counter for numbers */
export function CountUp({
  end,
  suffix = "",
  className = "",
}: {
  end: number;
  suffix?: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted.current) {
        hasStarted.current = true;
        const duration = 1.2; // seconds
        const steps = Math.ceil((duration * 60) / 1000); // 60fps
        const increment = end / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= end) {
            setCount(end);
            clearInterval(interval);
          } else {
            setCount(Math.floor(current));
          }
        }, 1000 / 60);

        observer.disconnect();
      }
    });

    const el = document.getElementById(`counter-${end}`);
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [end]);

  return (
    <span id={`counter-${end}`} className={className}>
      {count}
      {suffix}
    </span>
  );
}

/** Provider for reduced motion */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
