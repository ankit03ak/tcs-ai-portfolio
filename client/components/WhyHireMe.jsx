import SectionHeading from "./SectionHeading";

export default function WhyHireMe() {
  return (
    <section id="why-hire-me" className="section bg-slate-950">
      <div className="section-inner">
        <SectionHeading
          title="Why Should You Hire Me?"
          subtitle="A quick 1-2 minute intro where I talk about my strengths, mindset, and how I work."
        />
        <div className="glass p-5 md:p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 w-full">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800">
              {/* <video
                className="h-full w-full object-cover"
                controls
                src="https://player.cloudinary.com/embed/?cloud_name=depezajet&public_id=6b051c5a_r0xdab&profile=cld-default"
                // src="https://drive.google.com/uc?export=download&id=1KIbTHDeOUi2r1eJqF_FdXwozClZGCb50"
              >
                Your browser does not support the video tag.
              </video> */}
                <iframe
    src="https://player.cloudinary.com/embed/?cloud_name=depezajet&public_id=6b051c5a_r0xdab&profile=cld-default"
    allow="autoplay; fullscreen"
    frameBorder="0"
    width="100%"
    height="100%"
  >
    
  </iframe>
            </div>
          </div>
          <div className="flex-1 space-y-3 text-sm md:text-base text-slate-300">
            <p>
              In this video, I briefly introduce myself, talk about how I approach
              learning and building projects, and share why I&apos;d be a strong
              fit for an AI-integrated full-stack internship.
            </p>
            <p className="text-slate-400 text-xs">
              Tip: Record the video in a quiet place, speak clearly and naturally.
              Don&apos;t over-focus on editing or production quality - focus on clarity
              and honesty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
