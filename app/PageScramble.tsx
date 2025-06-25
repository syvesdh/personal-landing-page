"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import React from "react";

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// Helper function to scramble text
function scrambleText(text: string): string {
  return text
    .split("")
    .map((char) => {
      if (char === " ") return " ";
      return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    })
    .join("");
}

// Component that scrambles its children text
function ScrambleWrapper({
  children,
  isScrambling,
}: {
  children: React.ReactNode;
  isScrambling: boolean;
}) {
  const [scrambledChildren, setScrambledChildren] = useState(children);
  const originalChildrenRef = useRef(children);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isScrambling) {
      // Start scrambling
      const interval = setInterval(() => {
        setScrambledChildren((prev) => {
          // Recursively scramble text in children
          return scrambleReactChildren(prev);
        });
      }, 50);

      scrambleIntervalRef.current = interval;

      // Stop after 0.5 seconds
      setTimeout(() => {
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current);
          scrambleIntervalRef.current = null;
          setScrambledChildren(originalChildrenRef.current);
        }
      }, 500);
    } else {
      setScrambledChildren(originalChildrenRef.current);
    }

    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
        scrambleIntervalRef.current = null;
      }
    };
  }, [isScrambling]);

  // Update original children when they change
  useEffect(() => {
    originalChildrenRef.current = children;
    if (!isScrambling) {
      setScrambledChildren(children);
    }
  }, [children, isScrambling]);

  return <>{scrambledChildren}</>;
}

// Recursively scramble text in React children
function scrambleReactChildren(children: React.ReactNode): React.ReactNode {
  // Skip special React elements (like React.lazy) that do not have props
  if (
    children &&
    typeof children === "object" &&
    "$$typeof" in children &&
    !("props" in children)
  ) {
    return children;
  }

  if (typeof children === "string") {
    return scrambleText(children);
  }

  if (typeof children === "number") {
    return scrambleText(children.toString());
  }

  if (Array.isArray(children)) {
    return children.map((child, index) => {
      const scrambledChild = scrambleReactChildren(child);
      // Add key if the child is a React element
      if (
        scrambledChild &&
        typeof scrambledChild === "object" &&
        "type" in scrambledChild
      ) {
        const element = scrambledChild as React.ReactElement;
        return React.cloneElement(element, {
          key: element.key || `scrambled-${index}`,
          ...element.props,
        });
      }
      return scrambledChild;
    });
  }

  if (children && typeof children === "object" && "props" in children) {
    const element = children as React.ReactElement;
    const scrambledProps = { ...element.props };

    // Scramble text content in props
    if (scrambledProps.children) {
      scrambledProps.children = scrambleReactChildren(scrambledProps.children);
    }

    return React.cloneElement(element, scrambledProps);
  }

  return children;
}

export function PageScramble({ children }: { children: React.ReactNode }) {
  const [isScrambling, setIsScrambling] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Start scrambling on route change
    setIsScrambling(true);

    // Stop scrambling after 0.5 seconds
    const timer = setTimeout(() => {
      setIsScrambling(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  // Also trigger scrambling on initial mount
  useEffect(() => {
    // Start scrambling on initial load
    setIsScrambling(true);

    // Stop scrambling after 0.5 seconds
    const timer = setTimeout(() => {
      setIsScrambling(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []); // Empty dependency array means this runs only on mount

  return (
    <ScrambleWrapper isScrambling={isScrambling}>{children}</ScrambleWrapper>
  );
}
