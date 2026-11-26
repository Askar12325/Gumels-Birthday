import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gate } from "./components/Gate";
import { Hero } from "./components/Hero";
import { StorySection } from "./components/StorySection";
import { MemoriesSection } from "./components/MemoriesSection";
import { TimelineSection } from "./components/TimelineSection";
import { MovingMomentsSection } from "./components/MovingMomentsSection";
import { MakeAWishSection } from "./components/MakeAWishSection";
import { LetterSection } from "./components/LetterSection";
import { SiteFooter } from "./components/SiteFooter";
import { useLenis } from "./hooks/useLenis";

export function App() {
  const [gateOpen, setGateOpen] = useState(false);
  useLenis();

  return (
    <>
      <AnimatePresence mode="wait">
        {!gateOpen && (
          <Gate key="gate" onOpen={() => setGateOpen(true)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: gateOpen ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: gateOpen ? "auto" : "none" }}
      >
        <main aria-label="Birthday site for Amina">
          {/* 1. Hero */}
          <Hero />
          {/* 2. Our story */}
          <StorySection />
          {/* 3. Memories — string lights */}
          <MemoriesSection />
          {/* 4. Three years timeline */}
          <TimelineSection />
          {/* 5. Moving moments */}
          <MovingMomentsSection />
          {/* 6. Make a wish */}
          <MakeAWishSection />
          {/* 7. A letter for you */}
          <LetterSection />
        </main>
        <SiteFooter />
      </motion.div>
    </>
  );
}
