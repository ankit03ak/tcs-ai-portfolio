import VisitorCounter from "./VisitorCounter";

export default function Footer() {
  return (
    <footer
      className="border-t border-slate-800 bg-slate-950 py-6 mt-10"
    >
      <div className="section-inner flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-slate-400">
                <div className="flex flex-col gap-1">
          <p>© {new Date().getFullYear()} Ankit Kumar. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:vickyak1339@gmail.com"
            className="hover:text-emerald-400"
          >
            vickyak1339@gmail.com
          </a>
          <span className="hidden md:inline text-slate-600">•</span>
          <a
            href="https://github.com/ankit03ak"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400"
          >
            GitHub
          </a>
          <a
            href="http://www.linkedin.com/in/ankit-kumar-b2206436a"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400"
          >
            LinkedIn
          </a>
        </div>
          <VisitorCounter />
      </div>
    </footer>
  );
}
