import { CircleAlert } from "lucide-react";

export default function NormativeNotice({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="flex gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm leading-6 text-slate-400">
      <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
      <div>{children}</div>
    </aside>
  );
}
