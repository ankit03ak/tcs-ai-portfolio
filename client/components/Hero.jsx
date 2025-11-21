"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HERO_CONTENT =
  "MERN Stack Developer | Building Fast, Modern Web Applications and Fixing Bugs Quickly | Passionate about Software Development | Problem Solver.";

export default function Hero() {
  return (
    <section className="section">
      <div className="section-inner flex flex-col md:flex-row items-center gap-10">
        {/* Left: text */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">
            Hello, I&apos;m Ankit
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Building{" "}
            <span className="text-emerald-400">Modern Web Experiences</span>{" "}
            with MERN.
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-xl">
            {HERO_CONTENT}
          </p>
          <div className="flex flex-wrap gap-3">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              See my work
              <ArrowRight className="h-4 w-4" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2 text-sm font-medium text-slate-200 hover:border-emerald-400 hover:text-emerald-400 transition-colors"
            >
              Let&apos;s connect
            </motion.a>
          </div>
        </motion.div>

        {/* Right: profile card / image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <motion.div
            className="relative h-60 w-60 md:h-80 md:w-80 rounded-full overflow-hidden border border-emerald-500/40 shadow-lg shadow-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/images/profile_pic.png"
              alt="Ankit Kumar"
              className="h-full w-full object-cover"
            />

            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
