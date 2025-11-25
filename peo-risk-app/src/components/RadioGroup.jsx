import { Check } from "lucide-react";
import { cn } from "../lib/utils";

export function RadioGroup({ options, value, onChange }) {
    return (
        <div className="space-y-3">
            {options.map((option) => (
                <label
                    key={option.value}
                    className={cn(
                        "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                        value === option.value
                            ? "border-blue-500 bg-blue-50 shadow-sm"
                            : "border-slate-300 bg-white hover:border-slate-400 hover:shadow-sm"
                    )}
                >
                    <div className="relative flex items-center justify-center">
                        <input
                            type="radio"
                            name="radio-group"
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                            className="sr-only"
                        />
                        <div
                            className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                value === option.value
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-slate-300 bg-white"
                            )}
                        >
                            {value === option.value && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                        </div>
                    </div>
                    <span
                        className={cn(
                            "font-medium transition-colors",
                            value === option.value ? "text-blue-900" : "text-slate-700"
                        )}
                    >
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
}
