import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

export default function Projects({ projects }) {
  return (
    <section id="projects" className="section bg-slate-950">
      <div className="section-inner">
        <SectionHeading
          title="Projects"
          subtitle="Some of the real-world projects I've built, deployed, and learned from."
        />

        {(!projects || projects.length === 0) ? (
          <p className="text-center text-slate-500 text-sm">
            No projects found yet. (Check if the backend is running and seeded.)
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id || project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
