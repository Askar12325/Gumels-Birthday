import { motion } from "framer-motion";

export function ScrollCue() {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 1 }}
      aria-hidden="true"
    >
      <span
        className="text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "var(--font-body)", color: "var(--dusty-rose)", fontSize: "0.65rem" }}
      >
        scroll
      </span>
      <motion.div
        className="w-px bg-dusty-rose"
        style={{ background: "var(--dusty-rose)", height: "36px" }}
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
      />
    </motion.div>
  );
}
