import { useState } from "react";
import { questions as initialQuestions } from "./data/questions";
import { QuestionItem } from "./components/QuestionItem";
import { Button } from "./components/Button";
import { AdminPanel } from "./components/AdminPanel";
import { ShieldCheck, Send, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5026/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      const data = await response.json();
      console.log('Assessment submitted:', data);
      setIsComplete(true);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveQuestions = (updatedQuestions) => {
    setQuestions(updatedQuestions);
    // In a real app, you would save to a backend here
    console.log("Questions updated:", updatedQuestions);
  };

  // Filter visible questions based on conditions
  const visibleQuestions = questions.filter((q) => {
    if (!q.condition) return true;
    return q.condition(answers);
  });

  // Show questions one at a time - only show up to the first unanswered question
  const questionsToShow = [];
  for (let i = 0; i < visibleQuestions.length; i++) {
    const question = visibleQuestions[i];
    questionsToShow.push(question);

    // Check if this question is answered
    const answer = answers[question.id];
    const isAnswered = question.type === 'company_profile'
      ? answer?.companyName && answer?.state  // For company profile, check if key fields are filled
      : answer !== undefined && answer !== '';  // For other types, check if not empty

    // If not answered, stop here and don't show more questions
    if (!isAnswered) {
      break;
    }
  }

  // Admin mode view
  if (isAdminMode) {
    return (
      <AdminPanel
        questions={questions}
        onSave={handleSaveQuestions}
        onBack={() => setIsAdminMode(false)}
      />
    );
  }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-xl leading-none">PEO RiskGuard</h1>
              <p className="text-sm text-slate-500 mt-1">Risk Assessment Questionnaire</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminMode(true)}
            className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border-2 border-transparent hover:border-slate-200"
            title="Admin Panel"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="popLayout">
            {questionsToShow.map((question, index) => (
              <QuestionItem
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={(val) => handleAnswer(question.id, val)}
                questionNumber={index + 1}
              />
            ))}
          </AnimatePresence>

          <motion.div
            layout
            className="pt-6"
          >
            <Button
              type="submit"
              className="w-full text-lg h-14 shadow-lg hover:shadow-xl"
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
