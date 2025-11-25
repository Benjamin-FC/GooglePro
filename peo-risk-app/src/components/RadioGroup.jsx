import { cn } from "../lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

export function RadioGroup({ options, value, onChange, className }) {
    return (
        <div className={cn("grid gap-3", className)}>
            {options.map((opt) => {
                const isSelected = value === opt.value;
                return (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => onChange(opt.value)}
                        className={cn(
                            "flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 text-left group",
                            isSelected
                                ? "border-blue-500 bg-blue-50/50 shadow-sm"
                                : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                        )}
                    >
                        <span
                            className={cn(
                                "font-medium",
                                isSelected ? "text-blue-900" : "text-slate-700"
                            )}
                        >
                            {opt.label}
                        </span>
                        {isSelected ? (
                            <CheckCircle2 className="w-6 h-6 text-blue-500" />
                        ) : (
                            <Circle className="w-6 h-6 text-slate-300 group-hover:text-blue-300 transition-colors" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
