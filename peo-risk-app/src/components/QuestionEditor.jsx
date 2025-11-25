import { useState } from "react";
import { Button } from "./Button";
import { Input, TextArea } from "./Input";
import { Select } from "./Select";
import { X, Plus, Trash2 } from "lucide-react";

export function QuestionEditor({ question, onSave, onCancel, isNew }) {
    const [formData, setFormData] = useState(question);
    const [options, setOptions] = useState(question.options || []);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleAddOption = () => {
        setOptions([...options, { label: "", value: "" }]);
    };

    const handleRemoveOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const handleOptionChange = (index, field, value) => {
        const newOptions = [...options];
        newOptions[index][field] = value;
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedQuestion = {
            ...formData,
            options: ["select", "radio"].includes(formData.type) ? options : undefined,
        };
        onSave(updatedQuestion);
    };

    const questionTypes = [
        { label: "Text Input", value: "text" },
        { label: "Number Input", value: "number" },
        { label: "Text Area", value: "textarea" },
        { label: "Dropdown Select", value: "select" },
        { label: "Radio Buttons", value: "radio" },
        { label: "Company Profile", value: "company_profile" },
    ];

    const needsOptions = ["select", "radio"].includes(formData.type);

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">
                            {isNew ? "Add New Question" : "Edit Question"}
                        </h2>
                        <button
                            onClick={onCancel}
                            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Question ID</label>
                            <Input
                                value={formData.id}
                                onChange={(e) => handleChange("id", e.target.value)}
                                placeholder="e.g., company_name"
                                required
                                disabled={!isNew}
                            />
                            <p className="text-xs text-slate-500">
                                {isNew ? "Unique identifier for this question" : "ID cannot be changed after creation"}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Question Text *</label>
                            <TextArea
                                value={formData.text}
                                onChange={(e) => handleChange("text", e.target.value)}
                                placeholder="What is your question?"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Question Type *</label>
                            <Select
                                value={formData.type}
                                onChange={(e) => handleChange("type", e.target.value)}
                                options={questionTypes}
                                required
                            />
                        </div>

                        {formData.type !== "company_profile" && formData.type !== "radio" && (
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Placeholder Text</label>
                                <Input
                                    value={formData.placeholder || ""}
                                    onChange={(e) => handleChange("placeholder", e.target.value)}
                                    placeholder="e.g., Enter your answer here"
                                />
                            </div>
                        )}

                        {needsOptions && (
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-slate-700">Options *</label>
                                    <Button type="button" variant="secondary" onClick={handleAddOption}>
                                        <Plus className="w-4 h-4" />
                                        Add Option
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    {options.map((option, index) => (
                                        <div key={index} className="flex gap-2 items-start">
                                            <div className="flex-1 grid grid-cols-2 gap-2">
                                                <Input
                                                    value={option.label}
                                                    onChange={(e) => handleOptionChange(index, "label", e.target.value)}
                                                    placeholder="Label (shown to user)"
                                                    required
                                                />
                                                <Input
                                                    value={option.value}
                                                    onChange={(e) => handleOptionChange(index, "value", e.target.value)}
                                                    placeholder="Value (stored)"
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveOption(index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Description (Optional)</label>
                            <TextArea
                                value={formData.description || ""}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Additional help text for this question"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Condition (Advanced)</label>
                            <TextArea
                                value={formData.conditionText || ""}
                                onChange={(e) => handleChange("conditionText", e.target.value)}
                                placeholder="e.g., answers.state === 'CA'"
                                className="font-mono text-sm"
                            />
                            <p className="text-xs text-slate-500">
                                JavaScript expression to determine when this question should appear
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-slate-200">
                            <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1">
                                {isNew ? "Add Question" : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
