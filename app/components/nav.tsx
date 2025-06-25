"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { PageScramble } from "../PageScramble";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
  "https://vercel.com/templates/next.js/portfolio-starter-kit": {
    name: "deploy",
  },
};

// Characters to use for scrambling - now using alphabets
const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function ScrambleText({
  children,
  isScrambling,
}: {
  children: string;
  isScrambling: boolean;
}) {
  const [displayText, setDisplayText] = useState(children);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isScrambling) {
      // Start scrambling
      const interval = setInterval(() => {
        setDisplayText((prev) => {
          return prev
            .split("")
            .map((char, index) => {
              if (char === " ") return " "; // Keep spaces
              return scrambleChars[
                Math.floor(Math.random() * scrambleChars.length)
              ];
            })
            .join("");
        });
      }, 50); // Update every 50ms for smooth scrambling effect

      scrambleIntervalRef.current = interval;

      // Stop scrambling after 0.5 second
      setTimeout(() => {
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current);
          scrambleIntervalRef.current = null;
          setDisplayText(children); // Restore original text
        }
      }, 500);
    } else {
      // Clear interval if not scrambling
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
        scrambleIntervalRef.current = null;
      }
      setDisplayText(children);
    }

    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
        scrambleIntervalRef.current = null;
      }
    };
  }, [isScrambling, children]);

  return <span className="font-mono">{displayText}</span>;
}

export function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isHovered = hoveredLink === path;
              return (
                <PageScramble>
                  <Link
                    key={path}
                    href={path}
                    className="transition-all duration-500 ease-in-out hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 rounded-md"
                    onMouseEnter={() => setHoveredLink(path)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <ScrambleText isScrambling={isHovered}>{name}</ScrambleText>
                  </Link>
                </PageScramble>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
