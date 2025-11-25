import { cn } from "../lib/utils";

export function Input({ className, ...props }) {
    return (
        <input
            className={cn(
                "w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-900",
                className
            )}
            {...props}
        />
    );
}

export function TextArea({ className, ...props }) {
    return (
        <textarea
            className={cn(
                "w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-900 min-h-[120px] resize-y",
                className
            )}
            {...props}
        />
    );
}
