export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
