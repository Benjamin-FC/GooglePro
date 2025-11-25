import { motion, AnimatePresence } from "framer-motion";
import { Input, TextArea } from "./Input";
import { Select } from "./Select";
import { RadioGroup } from "./RadioGroup";
import { CompanyProfile } from "./CompanyProfile";
import { Search, Loader2, Building2, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";

export function QuestionItem({ question, value, onChange, onLookup }) {
    const [isSearching, setIsSearching] = useState(false);
    const [lookupData, setLookupData] = useState(null);

    if (question.type === "company_profile") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4"
            >
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-slate-900">{question.text}</h3>
                    <p className="text-slate-500 text-sm">
                        Please provide your company details to begin the assessment.
                    </p>
                </div>
                <CompanyProfile value={value} onChange={onChange} />
            </motion.div>
        );
    }

    const handleLookup = async () => {
        if (!value) return;
        setIsSearching(true);

        // Simulate API call to Florida Sunbiz
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLookupData({
            name: value,
            status: "Active",
            filingDate: "2023-01-15",
            address: "123 Ocean Drive, Miami, FL 33101",
            officers: ["Jane Doe", "John Smith"],
            docNumber: "L23000012345"
        });
        setIsSearching(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4"
        >
            <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">{question.text}</h3>
                {question.description && (
                    <p className="text-slate-500 text-sm">{question.description}</p>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex gap-3">
                    <div className="flex-1">
                        {question.type === "text" && (
                            <Input
                                value={value || ""}
                                onChange={(e) => onChange(e.target.value)}
                                placeholder={question.placeholder}
                            />
                        )}
                        {question.type === "number" && (
                            <Input
                                type="number"
                                value={value || ""}
                                onChange={(e) => onChange(e.target.value)}
                                placeholder={question.placeholder}
                            />
                        )}
                        {question.type === "textarea" && (
                            <TextArea
                                value={value || ""}
                                onChange={(e) => onChange(e.target.value)}
                                placeholder={question.placeholder}
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

                    {question.lookup && (
                        <Button
                            type="button"
                            onClick={handleLookup}
                            disabled={!value || isSearching}
                            className="shrink-0"
                        >
                            {isSearching ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Search className="w-5 h-5" />
                            )}
                            Search Sunbiz
                        </Button>
                    )}
                </div>

                {/* Lookup Results */}
                <AnimatePresence>
                    {lookupData && question.lookup && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-slate-50 rounded-xl p-4 border border-slate-200 overflow-hidden"
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Building2 className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">{lookupData.name}</h4>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            {lookupData.status}
                                        </span>
                                        <span>•</span>
                                        <span>Doc #{lookupData.docNumber}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    {lookupData.address}
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    Filed: {lookupData.filingDate}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
