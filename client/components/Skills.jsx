"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import MotionSection from "./MotionSection";

const SKILLS = {
  Languages: ["C", "C++", "Python", "JavaScript"],
  Frontend: [
    "React",
    "Next.js",
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript (basic)",
    "Tailwind CSS",
    "Radix UI"
  ],
  Backend: ["Node.js", "Express", "REST APIs", "Socket.IO"],
  Databases: ["MongoDB", "MySQL", "Supabase", "Prisma"],
  "Developer Tools": [
    "VS Code",
    "Git",
    "GitHub",
    "Postman",
    "Chrome DevTools",
    "Inngest",
    "Resend"
  ],
  "Auth & Security": ["JWT", "Bcrypt", "NextAuth", "Clerk", "Context API"],
  "UI/UX Enhancements": ["next-themes", "Sonner", "Toastify"],
  "Cloud & Storage": ["Cloudinary", "Vercel", "Render"],
  "AI & Others": ["Gemini", "Recharts"]
};

export default function Skills() {
  const entries = Object.entries(SKILLS);

  return (
    <MotionSection
      id="skills"
      className="section bg-slate-950"
      delay={0.1}
    >
      <div className="section-inner">
        <SectionHeading
          title="Skills & Tech Stack"
          subtitle="Technologies I use to build modern, scalable web applications."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {entries.map(([category, skills], index) => (
            <motion.div
              key={category}
              className="glass p-8 flex flex-col gap-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs text-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
