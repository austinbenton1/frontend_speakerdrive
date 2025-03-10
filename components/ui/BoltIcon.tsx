"use client";
import { motion } from "framer-motion";

export const BoltIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={175}
      height={175}
      fill="none"
      initial={{
        filter: "drop-shadow(0 0px 12px rgba(255, 255, 255, 0.2))",
        color: "#0B0B0B",
      }}
      animate={{
        filter: "drop-shadow(0 0px 24px rgba(255, 255, 255, 0.3))",
        color: "#131313",
      }}
      transition={{
        duration: 1.6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <path
        fill="currentColor"
        stroke="#334155"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.229}
        d="m153.426 106.017-59.85 47.684-33.334 16.666 23.7-18.883 36.15-28.8c2.05-1.583 2.45-4.35 1.184-8.283-1.284-3.934-3.5-6.817-6.65-8.634L86.442 89.484l33.334-16.667 28.183 16.284c3.15 1.816 5.367 4.7 6.65 8.633 1.267 3.933.867 6.7-1.183 8.283"
      />
      <path
        fill="currentColor"
        stroke="#334155"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.229}
        d="M93.575 153.701c-.517.4-1.067.683-1.667.833zM120.091 122.684l-36.15 28.8-23.7 18.883c-1.333 1.05-2.966 1.283-4.9.716-1.95-.566-3.816-1.85-5.65-3.883-1.817-2.016-3.233-4.333-4.267-6.949-1.033-2.617-1.433-5.034-1.183-7.25l5.817-42.767-22.55-13.017c-2.917-1.683-5.067-4.433-6.45-8.216q-2.1-5.7.45-8.4L75.89 22.25c.3-.317.617-.567.967-.784l.117-.066.5-.234c.9-.4 1.95-.466 3.15-.25 1.933.35 3.933 1.534 6 3.567.9.883 1.683 1.817 2.366 2.817a18.2 18.2 0 0 1 2.183 4.183c.967 2.65 1.334 5.083 1.084 7.317L86.44 89.484l28.184 16.283c3.15 1.817 5.366 4.7 6.65 8.634 1.266 3.933.866 6.7-1.184 8.283"
      />
      <path
        fill="currentColor"
        stroke="#334155"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.229}
        d="m125.591 22.134-5.816 50.683-33.334 16.667 5.817-50.683c.25-2.234-.117-4.667-1.083-7.317-.55-1.5-1.284-2.9-2.184-4.183-.683-1-1.466-1.934-2.366-2.817-2.067-2.033-4.067-3.217-6-3.567-1.2-.216-2.25-.15-3.15.25l32.9-16.466c1.016-.567 2.2-.717 3.583-.45 1.933.35 3.933 1.533 6 3.566q3.075 3.025 4.55 7c.967 2.65 1.333 5.084 1.083 7.317"
      />
      <path fill="currentColor" d="m110.558 4.6-.183.1Z" />
      <path
        stroke="#334155"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.229}
        d="m110.558 4.6-.183.1"
      />
    </motion.svg>
  );
};