import MotionSection from "./MotionSection";

const ABOUT_TEXT =
  "I am an ambitious and dedicated full-stack developer, currently pursuing my B.Tech in Computer Science and Engineering at the Indian Institute of Information Technology, Ranchi. Over the years, I have gained practical experience working with various web technologies, including React, Next.js, Node.js, and MongoDB. I am passionate about software development and love creating efficient, user-centric applications. Outside of coding, I enjoy exploring new tech, debugging bugs, and developing creative solutions to complex problems.";

export default function About() {
  return (
    <MotionSection id="about" className="section bg-slate-950">
      <div className="section-inner">
        <div className="glass p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            About Me
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            {ABOUT_TEXT}
          </p>
        </div>
      </div>
    </MotionSection>
  );
}
