import { cn } from "../lib/utils";

export function Input({ className, ...props }) {
    return (
        <input
            className={cn(
                "w-full px-4 py-3 rounded-lg bg-white border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-900 hover:border-slate-400",
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
                "w-full px-4 py-3 rounded-lg bg-white border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-900 min-h-[120px] resize-y hover:border-slate-400",
                className
            )}
            {...props}
        />
    );
}
