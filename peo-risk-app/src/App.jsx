import { useState, useMemo } from "react";
import { questions } from "./data/questions";
import { QuestionCard } from "./components/QuestionCard";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    // Find next valid question
    let nextIndex = currentQuestionIndex + 1;
    while (
      nextIndex < questions.length &&
      questions[nextIndex].condition &&
      !questions[nextIndex].condition(answers)
    ) {
      nextIndex++;
    }

    if (nextIndex < questions.length) {
      setHistory((prev) => [...prev, currentQuestionIndex]);
      setCurrentQuestionIndex(nextIndex);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prevIndex = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentQuestionIndex(prevIndex);
  };

  const progress = useMemo(() => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  }, [currentQuestionIndex]);

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
            {Object.entries(answers).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-slate-200 pb-1 last:border-0">
                <span className="text-slate-500">{key}:</span>
                <span className="font-medium text-slate-900">{value}</span>
              </div>
            ))}
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 text-lg">PEO RiskGuard</span>
        </div>
        <div className="text-sm font-medium text-slate-500">
          Step {currentQuestionIndex + 1} of {questions.length}
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-200">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={handleAnswer}
            onNext={handleNext}
            onBack={handleBack}
            isFirst={history.length === 0}
            isLast={false} // We don't know if it's last until we check next conditions, but for UI we can check if it's the last in array
          />
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
