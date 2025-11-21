"use client";

import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      className="glass h-full p-8 flex flex-col gap-3"
      whileHover={{
        y: -6,
        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.25)",
        borderColor: "rgba(45, 212, 191, 0.5)"
      }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold">
            {project.title}
          </h3>
          {project.tags?.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wide bg-slate-900/80 border border-slate-700 px-2 py-0.5 rounded-full text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs md:text-sm text-slate-300">
        {project.shortDescription}
      </p>

      {project.techStack?.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] rounded-full bg-slate-900/80 border border-slate-800 px-2 py-0.5 text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex gap-3 pt-3 text-xs">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400 hover:text-emerald-300"
          >
            GitHub →
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-200 hover:text-emerald-300"
          >
            Live Demo →
          </a>
        )}
      </div>
    </motion.div>
  );
}
