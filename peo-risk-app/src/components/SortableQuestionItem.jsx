import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Edit2, Trash2 } from "lucide-react";
import { cn } from "../lib/utils";

export function SortableQuestionItem({ question, index, onEdit, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: question.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const getQuestionTypeLabel = (type) => {
        const labels = {
            text: "Text Input",
            number: "Number Input",
            textarea: "Text Area",
            select: "Dropdown",
            radio: "Radio Buttons",
            company_profile: "Company Profile",
        };
        return labels[type] || type;
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-4 transition-all",
                isDragging && "opacity-50 shadow-lg"
            )}
        >
            <button
                className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 transition-colors"
                {...attributes}
                {...listeners}
            >
                <GripVertical className="w-5 h-5" />
            </button>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">
                        #{index + 1}
                    </span>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {getQuestionTypeLabel(question.type)}
                    </span>
                    {question.condition && (
                        <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                            Conditional
                        </span>
                    )}
                </div>
                <p className="font-medium text-slate-900 truncate">{question.text || "Untitled Question"}</p>
                <p className="text-sm text-slate-500 truncate">ID: {question.id}</p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(question)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(question.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
