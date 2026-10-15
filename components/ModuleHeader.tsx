import type { LucideIcon } from "lucide-react";

export default function ModuleHeader({
  module,
  title,
  description,
  icon: Icon
}: {
  module: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <header className="mb-10 max-w-4xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-blue-400/20 bg-blue-500/10">
          <Icon className="h-5 w-5 text-blue-300" />
        </span>
        <span className="eyebrow">{module}</span>
      </div>
      <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400 md:text-lg">
        {description}
      </p>
    </header>
  );
}
