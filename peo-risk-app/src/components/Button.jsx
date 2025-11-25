import { cn } from "../lib/utils";

export function Button({ className, variant = "primary", ...props }) {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30",
        secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
        ghost: "text-slate-600 hover:bg-slate-100",
    };

    return (
        <button
            className={cn(
                "px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}
