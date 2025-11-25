import { motion } from "framer-motion";
import { Input, TextArea } from "./Input";
import { Select } from "./Select";
import { RadioGroup } from "./RadioGroup";
import { Button } from "./Button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export function QuestionCard({
    question,
    value,
    onChange,
    onNext,
    onBack,
    isFirst,
    isLast,
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-lg mx-auto"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {question.text}
                    </h2>
                    {question.description && (
                        <p className="text-slate-500 text-lg">{question.description}</p>
                    )}
                </div>

                <div className="min-h-[120px]">
                    {question.type === "text" && (
                        <Input
                            value={value || ""}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={question.placeholder}
                            autoFocus
                        />
                    )}
                    {question.type === "number" && (
                        <Input
                            type="number"
                            value={value || ""}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={question.placeholder}
                            autoFocus
                        />
                    )}
                    {question.type === "textarea" && (
                        <TextArea
                            value={value || ""}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={question.placeholder}
                            autoFocus
                        />
                    )}
                    {question.type === "select" && (
                        <Select
                            value={value || ""}
                            onChange={(e) => onChange(e.target.value)}
                            options={question.options || []}
                            placeholder={question.placeholder}
                        />
                    )}
                    {question.type === "radio" && (
                        <RadioGroup
                            value={value || ""}
                            onChange={onChange}
                            options={question.options || []}
                        />
                    )}
                </div>

                <div className="flex gap-3 pt-4">
                    {!isFirst && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onBack}
                            className="flex-1"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="flex-[2]"
                        disabled={!value && question.optional !== true}
                    >
                        {isLast ? "Submit Assessment" : "Next Question"}
                        {isLast ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            <ArrowRight className="w-5 h-5" />
                        )}
                    </Button>
                </div>
            </form>
        </motion.div>
    );
}
