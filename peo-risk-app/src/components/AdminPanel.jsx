import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableQuestionItem } from "./SortableQuestionItem";
import { Button } from "./Button";
import { Plus, Save, ArrowLeft } from "lucide-react";
import { QuestionEditor } from "./QuestionEditor";

export function AdminPanel({ questions, onSave, onBack }) {
    const [items, setItems] = useState(questions);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleEdit = (question) => {
        setEditingQuestion(question);
        setIsAddingNew(false);
    };

    const handleDelete = (questionId) => {
        if (confirm("Are you sure you want to delete this question?")) {
            setItems(items.filter((q) => q.id !== questionId));
        }
    };

    const handleSaveQuestion = (updatedQuestion) => {
        if (isAddingNew) {
            setItems([...items, updatedQuestion]);
        } else {
            setItems(items.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)));
        }
        setEditingQuestion(null);
        setIsAddingNew(false);
    };

    const handleAddNew = () => {
        const newQuestion = {
            id: `question_${Date.now()}`,
            text: "",
            type: "text",
            placeholder: "",
        };
        setEditingQuestion(newQuestion);
        setIsAddingNew(true);
    };

    const handleSaveAll = () => {
        onSave(items);
        alert("Questions saved successfully!");
    };

    if (editingQuestion) {
        return (
            <QuestionEditor
                question={editingQuestion}
                onSave={handleSaveQuestion}
                onCancel={() => {
                    setEditingQuestion(null);
                    setIsAddingNew(false);
                }}
                isNew={isAddingNew}
            />
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={onBack}>
                            <ArrowLeft className="w-5 h-5" />
                            Back to Form
                        </Button>
                        <h1 className="text-3xl font-bold text-slate-900">Question Manager</h1>
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={handleAddNew}>
                            <Plus className="w-5 h-5" />
                            Add Question
                        </Button>
                        <Button onClick={handleSaveAll}>
                            <Save className="w-5 h-5" />
                            Save All Changes
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <p className="text-sm text-slate-500 mb-4">
                        Drag and drop questions to reorder them. Click on a question to edit it.
                    </p>

                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={items.map((q) => q.id)} strategy={verticalListSortingStrategy}>
                            <div className="space-y-3">
                                {items.map((question, index) => (
                                    <SortableQuestionItem
                                        key={question.id}
                                        question={question}
                                        index={index}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>

                    {items.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            <p>No questions yet. Click "Add Question" to create one.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
