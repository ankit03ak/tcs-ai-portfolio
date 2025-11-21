import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import WhyHireMe from "@/components/WhyHireMe";
import { fetchProjects } from "@/lib/api";
import Contact from "@/components/Contact";

export default async function HomePage() {
  let projects = [];
  try {
    projects = await fetchProjects();
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects projects={projects} />
      <WhyHireMe />
      <Contact />
    </>
  );
}
