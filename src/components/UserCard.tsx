import { LucideIcon } from "lucide-react";

type UserCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  bgColor?: string;
  textColor?: string;
};

export default function UserCard({
  title,
  value,
  icon: Icon,
  bgColor = "bg-slate-100",
  textColor = "text-slate-700",
}: UserCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 p-5 flex flex-col justify-between min-h-[130px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${bgColor}`}
    >
      {/* Soft Glow */}
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/40 blur-2xl" />

      {/* Top Row */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="rounded-full border border-slate-200 bg-white/80 px-2 py-1 text-[10px] text-slate-500 backdrop-blur">
          2024 / 25
        </span>

        {/* Premium Icon */}
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-violet-100 ring-1 ring-purple-200 transition-transform duration-300 group-hover:scale-110">
          <Icon
            className="h-4 w-4 text-indigo-600 sm:h-4.5 sm:w-4.5"
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Value */}
      <h1 className="relative z-10 mt-4 text-2xl font-bold text-slate-800 sm:text-3xl">
        {value}
      </h1>

      {/* Title */}
      <h2
        className={`relative z-10 text-xs font-medium capitalize sm:text-sm ${textColor}`}
      >
        {title}
      </h2>
    </div>
  );
}