import { useState } from "react";
import { questions } from "./data/questions";
import { QuestionItem } from "./components/QuestionItem";
import { Button } from "./components/Button";
import { ShieldCheck, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  // Filter visible questions based on conditions
  const visibleQuestions = questions.filter((q) => {
    if (!q.condition) return true;
    return q.condition(answers);
  });

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Assessment Complete</h2>
            <p className="text-slate-500 mt-2">
              Thank you for completing the risk assessment. We will review your information and get back to you shortly.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl text-left text-sm space-y-2 max-h-60 overflow-y-auto">
            <h3 className="font-semibold text-slate-700 mb-2">Summary:</h3>
            {Object.entries(answers).map(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                return Object.entries(value).map(([subKey, subValue]) => (
                  <div key={`${key}-${subKey}`} className="flex justify-between border-b border-slate-200 pb-1 last:border-0">
                    <span className="text-slate-500">{subKey}:</span>
                    <span className="font-medium text-slate-900">{subValue}</span>
                  </div>
                ));
              }
              return (
                <div key={key} className="flex justify-between border-b border-slate-200 pb-1 last:border-0">
                  <span className="text-slate-500">{key}:</span>
                  <span className="font-medium text-slate-900">{value}</span>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
          >
            Start New Assessment
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-xl leading-none">PEO RiskGuard</h1>
            <p className="text-sm text-slate-500 mt-1">Risk Assessment Questionnaire</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="popLayout">
            {visibleQuestions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={(val) => handleAnswer(question.id, val)}
              />
            ))}
          </AnimatePresence>

          <motion.div
            layout
            className="pt-6 border-t border-slate-200"
          >
            <Button
              type="submit"
              className="w-full text-lg h-14"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Assessment"}
              <Send className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </form>
      </main>
    </div>
  );
}

export default App;
