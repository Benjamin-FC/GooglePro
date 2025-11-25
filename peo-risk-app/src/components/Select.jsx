import { cn } from "../lib/utils";
import { ChevronDown } from "lucide-react";

export function Select({ className, options, placeholder, value, ...props }) {
    return (
        <div className="relative">
            <select
                className={cn(
                    "w-full px-4 py-3 rounded-lg bg-white border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-slate-900 appearance-none cursor-pointer hover:border-slate-400",
                    className
                )}
                value={value || ""}
                {...props}
            >
                <option value="" disabled>
                    {placeholder || "Select an option"}
                </option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
        </div>
    );
}
